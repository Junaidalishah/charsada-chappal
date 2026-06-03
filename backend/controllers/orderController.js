import Order from "../models/Order.js";
import Notification from "../models/Notification.js";
import sendEmail from "../utils/sendEmail.js";

// ================= CREATE ORDER =================
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,
      customerName: req.body.customerName,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      address: req.body.address,
      province: req.body.province,
      paymentMethod: req.body.paymentMethod,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });

    // Send email without breaking order creation
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "New Order Received",
        html: `
<h2>🛒 New Order Received</h2>

<table border="1" cellpadding="10" cellspacing="0">
  <tr>
    <td><strong>Order ID</strong></td>
    <td>#${order._id.toString().slice(-6)}</td>
  </tr>

  <tr>
    <td><strong>Customer</strong></td>
    <td>${order.customerName}</td>
  </tr>

  <tr>
    <td><strong>Phone</strong></td>
    <td>${order.phone}</td>
  </tr>

  <tr>
    <td><strong>Province</strong></td>
    <td>${order.province}</td>
  </tr>

  <tr>
    <td><strong>City</strong></td>
    <td>${order.city}</td>
  </tr>

  <tr>
    <td><strong>Address</strong></td>
    <td>${order.address}</td>
  </tr>

  <tr>
    <td><strong>Total</strong></td>
    <td>PKR ${order.totalAmount}</td>
  </tr>
</table>
`,
      });

      console.log(
        `✅ Order email sent successfully for Order #${order._id
          .toString()
          .slice(-6)}`,
      );
    } catch (emailError) {
      console.error(
        `❌ Email Error for Order #${order._id.toString().slice(-6)}:`,
        emailError.message,
      );
    }

    // Create notification
    try {
      await Notification.create({
        title: "New Order",
        message: `Order #${order._id.toString().slice(-6)} received`,
      });
    } catch (notificationError) {
      console.error("❌ Notification Error:", notificationError.message);
    }

    // Always return success if order was created
    res.status(201).json(order);
  } catch (error) {
    console.error("❌ Create Order Error:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL ORDERS =================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "email").sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE ORDER STATUS =================
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Update values
    order.status = req.body.status || order.status;

    order.courierCompany = req.body.courierCompany ?? order.courierCompany;

    order.trackingNumber = req.body.trackingNumber ?? order.trackingNumber;

    // Save first
    const updatedOrder = await order.save();

    res.json(updatedOrder);

    if (
      order.status === "Shipped" &&
      order.email &&
      order.courierCompany &&
      order.trackingNumber
    ) {
      try {
        await sendEmail({
          to: order.email,
          subject: `Order Status Updated - #${order._id.toString().slice(-6)}`,

          html: `
        <h2>🚚 Your Order Has Been Shipped</h2>

        <p>Hello ${order.customerName},</p>

        <p>Your order is now on the way.</p>

        <table border="1" cellpadding="10" cellspacing="0">
          <tr>
            <td><strong>Order ID</strong></td>
            <td>#${order._id.toString().slice(-6)}</td>
          </tr>

          <tr>
            <td><strong>Courier Company</strong></td>
            <td>${order.courierCompany}</td>
          </tr>

          <tr>
            <td><strong>Tracking Number</strong></td>
            <td>${order.trackingNumber}</td>
          </tr>

          <tr>
            <td><strong>Status</strong></td>
            <td>${order.status}</td>
          </tr>
        </table>

        <p>
          You can use the tracking number on the courier website to track
          your parcel.
        </p>

        <p>Thank you for shopping with Charsadda Chappal ❤️</p>
      `,
        });

        console.log("✅ Shipment email sent");
      } catch (error) {
        console.log("❌ Shipment email failed:", error.message);
      }
    }

    // Send customer email
    try {
      await sendEmail({
        to: order.email,
        subject: `Order Status Updated - #${order._id.toString().slice(-6)}`,

        html: `
          <h2>Order Update</h2>

          <p>Hello ${order.customerName},</p>

          <p>Your order status has been updated.</p>

          <table border="1" cellpadding="10" cellspacing="0">
            <tr>
              <td><strong>Order ID</strong></td>
              <td>#${order._id.toString().slice(-6)}</td>
            </tr>

            <tr>
              <td><strong>Status</strong></td>
              <td>${order.status}</td>
            </tr>
          </table>

          <p>Thank you for shopping with Charsadda Chappal.</p>
        `,
      });

      console.log("✅ Customer status email sent");
    } catch (emailError) {
      console.log("❌ Customer email failed:", emailError.message);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= MY ORDERS =================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET SINGLE ORDER =================
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.user._id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
