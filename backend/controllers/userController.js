import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

const jwtauthtoken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, {
    expiresIn: process.env.TOKEN_EXPIRESIN,
  });
};

const userSignup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fields required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      jwtauthtoken: jwtauthtoken(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed, Enter Valid Email" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      jwtauthtoken: jwtauthtoken(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { userSignup, userLogin, getProfile };
