import Order from "../models/Order.js";

// ================= CREATE ORDER =================
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,

      customerName: req.body.customerName,

      phone: req.body.phone,

      city: req.body.city,

      address: req.body.address,

      paymentMethod: req.body.paymentMethod,

      items: req.body.items,

      totalAmount: req.body.totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL ORDERS =================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
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

    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
