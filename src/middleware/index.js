const config = require("../config");
const jwt = require("jsonwebtoken");
const pino = require("pino-http");

function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "unauthorized" });

  try {
    jwt.verify(token.split(" ")[1], config.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: "unauthorized" });
  }

  next();
}

module.exports = {
  logger: pino(),
  auth,
};
