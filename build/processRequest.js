"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
var ramda_1 = __importDefault(require("ramda"));
var dbAccess_1 = require("./utils/dbAccess");
var tools_1 = require("./utils/tools");
var processMessage = function (xml) {
    console.log('message received');
    console.log(xml);
    var type = xml.MsgType;
    console.log('Message TYpe', type);
    if (type === 'text') {
        return processTextMessage(xml.Content);
    }
    return Promise.resolve(type + ' Not Supported');
};
var processCmd = function (txt) {
    return tools_1.execPromise(txt, {
        cwd: os_1.default.homedir(),
        env: process.env,
        shell: '/usr/bin/zsh'
    });
};
var processNote = function (txt) {
    return tools_1.execPromise("note -s " + txt, { env: process.env });
};
var processQuote = function () {
    return dbAccess_1.quoteTable
        .query({
        orderBy: 'rand()',
        limit: 1
    })
        .then(ramda_1.default.head)
        .then(function (quote) { return quote.content + "\n\n --" + quote.author; });
};
var textMsgConfig = {
    cmd: processCmd,
    note: processNote,
    quote: processQuote
};
var processTextMessage = function (content) {
    if (content === void 0) { content = ''; }
    var foundKey = ramda_1.default.find(function (key) { return ramda_1.default.startsWith(key.toLowerCase(), content.toLocaleLowerCase()); }, ramda_1.default.keys(textMsgConfig));
    if (!foundKey) {
        return Promise.resolve(content + ' Not Supported');
    }
    var txt = content.slice(foundKey.length).trim();
    return Promise.resolve(textMsgConfig[foundKey](txt));
};
exports.default = processMessage;
