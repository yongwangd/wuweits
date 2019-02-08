export interface IWechatConfig {
  token: string;
  appid: string;
  encodingAESKey: string;
}

export interface IWechatMessage {
  MsgType: string;
  Content: string;
}

export interface IQuote {
  content: string;
  author: string;
  imgUrl: string;
}
