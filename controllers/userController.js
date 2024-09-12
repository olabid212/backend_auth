const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");


// Register user function
const registerUser = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
  });
  if (user) {
    const token = generateToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login user Function
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists && (await userExists.matchPassword(password))) {
    const token = generateToken(userExists._id)
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User login successfully",
      User,
      token,
    });
  } else {
    res.status(401).json({message: "Invalid email or password"})
  }
};

// Logout user function
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(0), 
  });

  return res.status(200).json({
    message: "User logged out successfully",
  });
};

module.exports = { 
  registerUser, 
  loginUser,
  logoutUser, 
};
