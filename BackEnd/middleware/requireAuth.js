const jwt = require("jsonwebtoken");
const User = require("../database/userSchema");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }
    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(_id);

    console.log("api: ", req.user)
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request is not authorized" });
  }
};

module.exports = requireAuth;
