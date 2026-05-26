import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// ================= DASHBOARD STATS =================
export const getDashboardStats = async (req, res) => {
  try {
    // TOTAL REVENUE
    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (acc, item) => acc + Number(item.totalAmount || 0),
      0,
    );

    // TOTAL ORDERS
    const totalOrders = orders.length;

    // TOTAL CUSTOMERS
    const totalCustomers = await User.countDocuments({
      isAdmin: false,
    });

    // TOTAL PRODUCTS
    const totalProducts = await Product.countDocuments();

    // RECENT ORDERS
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    // TOP CITIES
    const cityStats = await Order.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      recentOrders,
      cityStats,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
