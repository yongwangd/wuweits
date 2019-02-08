import express from 'express';
import url from 'url';
import wechat from 'wechat';
import processMessage from './processRequest';
import { IWechatConfig } from './types';

const PORT = 8000;


const config: IWechatConfig = {
  appid: 'wxcc7e307e8a6570ee',
  encodingAESKey: '7IHBWnUPPWZyci7hgjhkOw6BHW41py5GahCG5rPpZGs',
  token: 'weixin'
};

const app = express();


app.get('/*', (req, res) => {
  console.log(req.query);
  const query = url.parse(req.url, true).query;
  res.send(query.echostr);
});

app.post(
  '/*',
  wechat(config, (req: any, res: any, next: any) => {
    console.log(req.body);
    return processMessage(req.weixin)
      .then(answer => {
        console.log('=============RESPONSE BODY============');
        console.log(answer);
        res.reply(answer);
      })
      .catch(err => {
        console.log(err);
        res.reply('Ops... Something went wrong here');
      });
  })
);


app.listen(PORT, () =>
  console.log('WECHAT [wuweifangtang] ts version running on PORT', PORT)
);
