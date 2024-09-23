import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ email: username });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "user tidak ditemukan", status_succes: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ msg: "password salah", status_succes: false });
    }

    const { _id, role, email: uname } = user;

    const token = jwt.sign(
      { id: _id, username: uname, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      // secure: false,  // Secure only in production
      httpOnly: true,
      // sameSite: "none",  // Keep this for cross-origin requests
      maxAge: 1000 * 60 * 60 * 10,  // Cookie lifetime
    });
    

    return res
      .status(200)
      .json({ msg: "Login successful", status_succes: true });
  } catch (error) {
    return res.status(500).json({ msg: error.message, status_succes: false });
  }
};
