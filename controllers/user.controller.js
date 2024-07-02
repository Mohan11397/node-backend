const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");

// generate token(JWT token)
const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
};

//to create a user -POST
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      bio,
      address,
      phoneNumber,
      socialLinks,
      isActive,
      lastLogin,
    } = req.body;

    console.log(req.body);

    //check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      profileImage: req?.file?.path || "",
      bio: bio || "",
      address: address || {},
      phoneNumber: phoneNumber || "",
      socialLinks: socialLinks || {},
      isActive: isActive !== undefined ? isActive : true,
      lastLogin: lastLogin || new Date(),
    });
    const createUser = await user.save();
    res.status(201).json({
      name: createUser.name,
      email: createUser.email,
      phoneNumber: createUser.phoneNumber,
      status: "user created successfully",
    });
  } catch (error) {
    console.log(error);
    if (req.file.path) {
      await fs.unlink(req.file.path);
    }
    res.status(400).json({ error: error.message });
  }
};

//to get a user -GET
const getUser = async (req, res) => {
  const { _id, email, name } = await userModel.findById(req.user.id);
  try {
    return res.status(200).json({ _id, email, name, message: "Id found" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//to get logged in user -post
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  try {
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);

      res.cookie("accessToken", token, {
        httpOnly: true,
      });

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
        status: "user logged in successfully",
      });
    } else {
      return res.status(404).json({ message: "Invalid User Details" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//to get logged in user -post
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, getUser, loginUser, logoutUser };
