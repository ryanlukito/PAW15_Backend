import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    if (!req.superAccess) {
      return res.status(403).json({ msg: "maaf anda bukan admin" });
    }

    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const getUserbyId = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.superAccess) {
      return res.status(403).json({ msg: "maaf anda bukan admin" });
    }
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// create user
export const createUser = async (req, res) => {
  try {
    // if (!req.superAccess) {
    //   return res.status(403).json({ msg: "maaf anda bukan admin" });
    // }
    const { firstname, lastname, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(password, salt);
    const user = new User({
      firstname: firstname,
      password: hashpwd,
      email: email,
      lastname: lastname,
      role: role,
    });
    await user.save();
    res.status(201).json({ msg: "data berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msh: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "user tidak ditemukan" });
    }
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(password, salt);
      user.password = hashpwd;
    }

    const updatedUser = await user.save();
    res.status(202).json({ msg: "user berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.superAccess) {
      return res.status(403).json({ msg: "maaf anda bukan admin" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "user tidak ditemukan" });
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({ msg: "data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
