import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

const jwtauthtoken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
};

const userSignup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json("Fields required");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json("User already exists");
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
  } catch (err) {
    res.status(500).json("Signup failed");
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json("Invalid password");
    }
    if (user) {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        jwtauthtoken: jwtauthtoken(user),
      });
    }
  } catch (err) {
    res.status(500).json("Login failed");
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

export { userSignup, userLogin, getProfile };
