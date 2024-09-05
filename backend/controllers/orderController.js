import Order from "../model/Order.js";

export const createOrder = async (req, res) => {
  const { orderItems, totalPrice, address, phone } = req.body;

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
      address,
      phone,
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: "Order created", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};
