"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.ORDER_STATUSES = exports.PORT = void 0;
var dotenv = require("dotenv");
dotenv.config();
exports.PORT = (_a = process.env.API_PORT) !== null && _a !== void 0 ? _a : 3000;
exports.ORDER_STATUSES = process.env.ORDER_STATUSES ? process.env.ORDER_STATUSES.split(",") : [];
exports.JWT_SECRET = process.env.JWT_SECRET;
