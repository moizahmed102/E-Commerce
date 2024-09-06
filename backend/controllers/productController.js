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
    const { category, minPrice, maxPrice, sort, size } = req.query;

    let filter = {};
    if (category) {
      const categoryData = await Category.findOne({ name: category });
      if (categoryData) {
        filter.category = categoryData._id;
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }
    if (size) {
      filter.size = { $in: size.split(",") };
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
