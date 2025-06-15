const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Token not Found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const response = jwt.verify(token, process.env.SECRET_JWT);

    req.user = response;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Invalid Token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.SECRET_JWT, { expiresIn: 28800 });
};

module.exports = { jwtAuthMiddleware, generateToken };
