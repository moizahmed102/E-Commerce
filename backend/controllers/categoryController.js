import Category from "../model/Category.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = new Category({ name });
    const savedCategory = await category.save();
    res
      .status(201)
      .json({ message: "Category created", category: savedCategory });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve categories", error });
  }
};
