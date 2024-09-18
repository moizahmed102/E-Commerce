import Order from "../model/Order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // Include user's name and email
      .populate("orderItems.product", "title price"); // Include product details
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
};
