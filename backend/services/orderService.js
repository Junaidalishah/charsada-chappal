import Order from "../models/Order.js";

export const findOrdersByPhone = async (phone) => {
  return await Order.find({ phone }).sort({ createdAt: -1 }).limit(5);
};
