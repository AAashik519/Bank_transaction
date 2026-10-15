const userModal = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModal.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized access", success: false });
  }
}


module.exports = {
    authMiddleware,
};