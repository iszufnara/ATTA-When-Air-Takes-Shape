"use strict";
exports.__esModule = true;
exports.DataHandler = void 0;
var data_json_1 = require("../data/data.json");
var DataHandler = /** @class */ (function () {
    // Constructor
    function DataHandler() {
        var _this = this;
        this.data = [];
        var newData = data_json_1["default"].data;
        newData.forEach(function (key) { return _this.data.push(key); });
    }
    return DataHandler;
}());
exports.DataHandler = DataHandler;
