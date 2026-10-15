const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.services");

const userRegisterController = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log(name, email, password);

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const user = await userModel.create({ email, name, password });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token);

 
    const sendEmailStatus =await emailService.sendRegistrationEmail(user.email, user.name);

    console.log("sendEmailStatus", sendEmailStatus);
    return res.status(200).json({
      message: "Registration successful",
      success: true,
      token: token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });

    
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Email or password is invalid",
        success: false,
      });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Email or password is invalid",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token: token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
};
