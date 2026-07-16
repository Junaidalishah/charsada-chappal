import Order from "../models/Order.js";
import Notification from "../models/Notification.js";
import sendEmail from "../utils/sendEmail.js";
import Product from "../models/Product.js"; // ← Make sure this is imported

// ================= CREATE ORDER =================
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      city,
      address,
      province,
      paymentMethod,
      items,
      totalAmount,
      user,
    } = req.body;

    // ================= STOCK DEDUCTION LOGIC =================
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.title}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.title}. Available: ${product.stock}`,
        });
      }

      // Decrease stock
      product.stock -= Number(item.quantity);
      await product.save();
    }

    // ================= CREATE ORDER =================
    const order = await Order.create({
      user: user || null,

      customerName,
      email,
      phone,
      city,
      address,
      province,

      paymentMethod: paymentMethod || "cod",
      items,
      totalAmount,
    });

    // Return success immediately
    res.status(201).json(order);

    // ================= SEND EMAIL IN BACKGROUND =================
    const paymentDisplay =
      order.paymentMethod === "cod"
        ? "Cash on Delivery"
        : "EasyPaisa / JazzCash (Online)";

    sendEmail({
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
            <td><strong>Payment Method</strong></td>
            <td>${paymentDisplay}</td>
          </tr>

          <tr>
            <td><strong>Total</strong></td>
            <td>PKR ${order.totalAmount}</td>
          </tr>
        </table>
      `,
    })
      .then(() =>
        console.log(
          `✅ Email sent for Order #${order._id.toString().slice(-6)}`,
        ),
      )
      .catch((err) => console.error("Email Error:", err.message));

    // ================= CREATE NOTIFICATION =================
    Notification.create({
      title: "New Order",
      message: `Order #${order._id.toString().slice(-6)} received`,
    }).catch((err) => console.error("Notification Error:", err.message));
  } catch (error) {
    console.error("❌ Create Order Error:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= REST OF YOUR CONTROLLER (No changes needed) =================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status || order.status;
    order.courierCompany = req.body.courierCompany ?? order.courierCompany;
    order.trackingNumber = req.body.trackingNumber ?? order.trackingNumber;

    if (req.body.paymentStatus) {
      order.paymentStatus = req.body.paymentStatus;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      !req.user.isAdmin &&
      order.user &&
      order.user._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE ORDER =================
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    await order.deleteOne();

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
