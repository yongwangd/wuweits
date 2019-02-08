"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var url_1 = __importDefault(require("url"));
var wechat_1 = __importDefault(require("wechat"));
var processRequest_1 = __importDefault(require("./processRequest"));
var PORT = 8000;
var config = {
    appid: 'wxcc7e307e8a6570ee',
    encodingAESKey: '7IHBWnUPPWZyci7hgjhkOw6BHW41py5GahCG5rPpZGs',
    token: 'weixin'
};
var app = express_1.default();
app.get('/*', function (req, res) {
    console.log(req.query);
    var query = url_1.default.parse(req.url, true).query;
    res.send(query.echostr);
});
app.post('/*', wechat_1.default(config, function (req, res, next) {
    console.log(req.body);
    return processRequest_1.default(req.weixin)
        .then(function (answer) {
        console.log('=============RESPONSE BODY============');
        console.log(answer);
        res.reply(answer);
    })
        .catch(function (err) {
        console.log(err);
        res.reply('Ops... Something went wrong here');
    });
}));
app.listen(PORT, function () {
    return console.log('WECHAT [wuweifangtang] ts version running on PORT', PORT);
});
