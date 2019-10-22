"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv").config();
var app = express_1.default();
var _a = process.env, PORT = _a.PORT, GOOGLE_IMAGE_APIKEY = _a.GOOGLE_IMAGE_APIKEY, GOOGLE_IMAGE_CSEID = _a.GOOGLE_IMAGE_CSEID;
app.get("/", function (req, res) {
    res.status(201).json("Done");
});
exports.default = app;
