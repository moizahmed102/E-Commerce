import Cart from "../model/Cart.js";

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "orderItems.product"
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
};

export { getCart };
