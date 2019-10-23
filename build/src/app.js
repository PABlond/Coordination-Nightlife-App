"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var routes_1 = __importDefault(require("./routes"));
var path_1 = __importDefault(require("path"));
require("dotenv").config();
var _a = process.env, MONGO_PASSWORD = _a.MONGO_PASSWORD, MONGO_USER = _a.MONGO_USER, MONGO_DB = _a.MONGO_DB;
mongoose_1.default.connect("mongodb://" + MONGO_USER + ":" + MONGO_PASSWORD + "@ds137008.mlab.com:37008/stock-checker", {
    useNewUrlParser: true
});
var app = express_1.default();
app.use(express_1.default.static(__dirname + "/public"));
app.get("/", function (req, res) {
    var homepagePath = path_1.default.join(__dirname + "/index.html");
    res.sendFile(homepagePath);
});
app.use(routes_1.default);
exports.default = app;
