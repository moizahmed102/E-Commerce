import Order from "../model/Order.js";
import Cart from "../model/Cart.js";
import { sendEmail } from "../services/email.js";

export const createOrder = async (req, res) => {
  const { address, phone } = req.body;
  const userId = req.user.id;
  const userName = req.user.name;
  const userEmail = req.user.email;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "orderItems.product",
      "title price"
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

    const truncatedOrderId = order._id.toString().slice(0, 8);

    const emailContent = `
      Dear ${userName}, 
      Thank you for your order!
      Your order with ID: ${truncatedOrderId} is currently pending. 
      We are processing your order and will update you shortly.

      Order Summary:
      Total: $${cart.totalPrice.toFixed(2)}
      
      Items Purchased:
      ${cart.orderItems
        .map(
          (item) =>
            `${item.product.title} (Qty: ${item.quantity}) - Unit Price: $${item.product.price}`
        )
        .join("\n")}

      If you have any questions or queries, feel free to reach out to us at:
      Email: support@example.com
      Phone: 123-456-7890

      We will notify you once your order has been shipped. Thank you for your patience!

      - The Team
    `;

    await sendEmail(userEmail, "Order Confirmation", emailContent);
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
