import Order from "../model/Order.js";
import Cart from "../model/Cart.js";

export const createOrder = async (req, res) => {
  const { address, phone } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "orderItems.product",
      "price"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const order = new Order({
      user: userId,
      orderItems: cart.orderItems,
      totalPrice: cart.totalPrice,
      address,
      phone,
      status: "pending",
    });
    await order.save();
    await Cart.deleteOne({ user: userId });
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ user: userId })
      .populate("orderItems.product", "title price")
      .sort({ order_date: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve orders" });
  }
};
