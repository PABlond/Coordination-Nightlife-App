"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var search_1 = __importDefault(require("./../models/search"));
require("dotenv").config();
var _a = process.env, GOOGLE_IMAGE_APIKEY = _a.GOOGLE_IMAGE_APIKEY, GOOGLE_IMAGE_CX = _a.GOOGLE_IMAGE_CX;
var ImgSearch = /** @class */ (function () {
    function ImgSearch() {
        var _this = this;
        this.api_key = GOOGLE_IMAGE_APIKEY;
        this.cx = GOOGLE_IMAGE_CX;
        this.searchWithParams = function (_a) {
            var search = _a.search, start = _a.start;
            return __awaiter(_this, void 0, void 0, function () {
                var items;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: 
                        // Save the request in the database
                        return [4 /*yield*/, this.saveSearch({ search: search, when: new Date() })
                            // Request data using google image API
                        ];
                        case 1:
                            // Save the request in the database
                            _b.sent();
                            return [4 /*yield*/, axios_1.default.get("https://www.googleapis.com/customsearch/v1?q=" + search + "&start=" + (start ||
                                    1) + "&cx=" + this.cx + "&key=" + this.api_key + "&searchType=image")
                                // Format the result and return it
                            ];
                        case 2:
                            items = (_b.sent()).data.items;
                            // Format the result and return it
                            return [2 /*return*/, this.organizeGoogleResponse(items)];
                    }
                });
            });
        };
        this.lastImageSearch = function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = this.organizeLastSearch;
                    return [4 /*yield*/, this.getLastSearch()];
                case 1: return [2 /*return*/, _a.apply(this, [(_b.sent())])];
            }
        }); }); };
        this.organizeGoogleResponse = function (items) {
            return items.map(function (_a) {
                var url = _a.link, snippet = _a.snippet, _b = _a.image, _c = _b === void 0 ? {} : _b, context = _c.contextLink, thumbnail = _c.thumbnailLink;
                return ({
                    url: url,
                    snippet: snippet,
                    context: context,
                    thumbnail: thumbnail
                });
            });
        };
        this.organizeLastSearch = function (arr) {
            return arr.map(function (_a) {
                var term = _a.term, when = _a.when;
                return ({ term: term, when: when });
            });
        };
        this.saveSearch = function (_a) {
            var term = _a.search, when = _a.when;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, new search_1.default({ term: term, when: when }).save()];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.getLastSearch = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, search_1.default.find({}).limit(10)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    return ImgSearch;
}());
exports.default = ImgSearch;
