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

// Get Products with filtering and sorting
export const getProducts = async (req, res) => {
  try {
    // Extract query parameters for filtering and sorting
    const { category, minPrice, maxPrice, sort, size } = req.query;

    let filter = {};

    // If category is provided, find the corresponding category and filter products
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
      filter.size = { $in: size.split(",") }; // Assume exact size match
    }
    // Sorting logic for price
    let sortOption = {};
    if (sort === "high") {
      sortOption.price = -1; // Sort by price in descending order (high to low)
    } else if (sort === "low") {
      sortOption.price = 1; // Sort by price in ascending order (low to high)
    }

    // Find products with filtering and sorting
    const products = await Product.find(filter)
      .sort(sortOption)
      .populate("category", "name");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to get products" });
  }
};
