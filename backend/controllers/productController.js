import Product from "../model/product.js";
import Category from "../model/Category.js";

export const createProduct = async (req, res) => {
  const { title, description, categoryId, price } = req.body;
  const image = req.file ? req.file.filename : "";

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
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

export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;

    let filter = {};
    if (category) {
      if (category === "all") {
        const categories = await Category.find({
          name: { $in: ["Men", "Women", "Kids"] },
        });
        const categoryIds = categories.map((cat) => cat._id);
        filter.category = { $in: categoryIds };
      } else {
        const categoryData = await Category.findOne({ name: category });
        if (categoryData) {
          filter.category = categoryData._id;
        } else {
          return res.status(404).json({ message: "Category not found" });
        }
      }
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    let sortOption = {};
    if (sort === "high") {
      sortOption.price = -1;
    } else if (sort === "low") {
      sortOption.price = 1;
    }

    const products = await Product.find(filter)
      .sort(sortOption)
      .populate("category", "name");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to get products" });
  }
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { title, description, categoryId, price } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    let updatedData = {};

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      updatedData.category = categoryId;
    }
    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (price) updatedData.price = price;
    if (image) updatedData.image = `/uploads/${image}`;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};
