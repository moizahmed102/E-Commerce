import Cart from "../model/Cart.js";
import Product from "../model/product.js";

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      "orderItems.product",
      "title price"
    );
    if (!cart) {
      cart = new Cart({ user: req.user.id, orderItems: [] });
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      const itemIndex = cart.orderItems.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        cart.orderItems[itemIndex].quantity += parseInt(quantity);
      } else {
        cart.orderItems.push({
          product: productId,
          quantity: parseInt(quantity),
        });
      }
    } else {
      cart = new Cart({
        user: userId,
        orderItems: [{ product: productId, quantity: parseInt(quantity) }],
      });
    }
    await cart.save();

    const cartWithPrices = await Cart.findOne({ user: userId }).populate(
      "orderItems.product",
      "price"
    );
    cart.totalPrice = cartWithPrices.orderItems.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to the cart" });
  }
};

export const deleteFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "orderItems.product",
      "price"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.orderItems = cart.orderItems.filter(
      (item) => item.product._id.toString() !== productId
    );
    if (cart.orderItems.length === 0) {
      cart.totalPrice = 0;
      await cart.save();
      return res.status(200).json({ message: "Cart is empty" });
    }
    cart.totalPrice = cart.orderItems.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);
    await cart.save();
    return res
      .status(200)
      .json({ message: "Product deleted successfully", cart });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to delete product from cart" });
  }
};
