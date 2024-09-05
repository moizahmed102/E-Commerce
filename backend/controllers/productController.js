import Product from "../model/Product.js";
import Category from "../model/Category.js";

export const createProduct = async (req, res) => {
  const { title, description, categoryId, price } = req.body;
  const image = req.file ? req.file.filename : "";

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }
    const product = new Product({
      title,
      description,
      category: categoryId,
      image: `/uploads/${image}`,
      price,
    });

    const savedProduct = await product.save();
    res.status(201).json({ message: "Product created", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products", error });
  }
};
