const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token;

  const accessToken = req.cookies.accessToken;

  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith("Bearer")
  //   ) {

  if (!accessToken) {
    res.status(401).json({ message: "Not authorized, no token" });
  }

  if (accessToken) {
    try {
      //   token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(accessToken, process.env.SECRET_TOKEN);
      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
};

module.exports = { auth };
