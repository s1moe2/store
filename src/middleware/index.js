"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var jwt = require("jsonwebtoken");
var pino_http_1 = require("pino-http");
var config_1 = require("../config");
function auth(req, res, next) {
    var token = req.headers["authorization"];
    if (!token)
        return res.status(401).json({ error: "unauthorized" });
    try {
        jwt.verify(token.split(" ")[1], config_1.JWT_SECRET);
    }
    catch (error) {
        return res.status(401).json({ error: "unauthorized" });
    }
    next();
}
exports.logger = {
    logger: (0, pino_http_1.default)(),
    auth: auth,
};
