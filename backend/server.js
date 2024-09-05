import dotenv from "dotenv";
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import cartRoute from "./routes/cart.js";
import categoryRoute from "./routes/category.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/api", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/categories", categoryRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
