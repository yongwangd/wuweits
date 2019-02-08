"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
exports.execPromise = function (cmd, config) {
    if (config === void 0) { config = {}; }
    return new Promise(function (res, rej) {
        child_process_1.exec(cmd, __assign({ encoding: 'utf8' }, config), function (err, info) { return (err ? rej(err) : res(info)); });
    });
};
