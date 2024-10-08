import Order from "../model/Order.js";
import { sendEmail } from "../services/email.js";

export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: "user",
        select: "name email",
      })
      .populate({
        path: "orderItems.product",
        select: "title price",
      })
      .sort({ order_date: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!["pending", "shipped", "delivered"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .populate({
        path: "orderItems.product",
        select: "title price",
      });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const totalPrice = order.totalPrice;
    order.status = status;
    await order.save();

    const truncatedOrderId = orderId.slice(0, 8);

    let emailContent;
    switch (status) {
      case "pending":
        emailContent = `
          Dear ${order.user.name},

          Your order with ID: ${truncatedOrderId} is currently pending. 
          The total price of your order is $${totalPrice.toFixed(2)}.
          We are processing your order and will update you shortly.
          If you have any questions or queries, feel free to reach out to us at:
          Email: support@example.com
          Phone: 123-456-7890

          Thank you for your patience!

          - The Team
        `;
        break;
      case "shipped":
        emailContent = `
          Dear ${order.user.name},

          Your order with ID: ${truncatedOrderId} has been shipped! 
          The total price of your order is $${totalPrice.toFixed(2)}.
          You can expect it to arrive soon.
          If you have any questions or queries, feel free to reach out to us at:
          Email: support@example.com
          Phone: 123-456-7890

          Thank you for shopping with us!

          - The Team
        `;
        break;
      case "delivered":
        emailContent = `
          Dear ${order.user.name},

          Great news! Your order with ID: ${truncatedOrderId} has been delivered. 
          The total price of your order was $${totalPrice.toFixed(2)}.
          We hope you enjoy your purchase!
          If you have any questions or queries, feel free to reach out to us at:
          Email: support@example.com
          Phone: 123-456-7890

          Thank you for choosing us!

          - The Team
        `;
        break;
      default:
        emailContent = `
          Dear ${order.user.name},

          Your order with ID: ${truncatedOrderId} has been updated to: ${status}. 
          The total price of your order is $${totalPrice.toFixed(2)}.
          If you have any questions or queries, feel free to reach out to us at:
          Email: support@example.com
          Phone: 123-456-7890

          Thank you for shopping with us!

          - The Team
        `;
        break;
    }

    await sendEmail(order.user.email, "Order Status Updated", emailContent);

    return res
      .status(200)
      .json({ message: "Order status updated and email sent", order });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update order status" });
  }
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete order" });
  }
};
