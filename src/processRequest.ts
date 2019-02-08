import os from 'os';
import R from 'ramda';
import { IQuote, IWechatMessage } from './types';
import { quoteTable } from './utils/dbAccess';
import { execPromise } from './utils/tools';

const processMessage = (xml: IWechatMessage) => {
  console.log('message received');
  console.log(xml);

  const type = xml.MsgType;

  console.log('Message TYpe', type);

  if (type === 'text') {
    return processTextMessage(xml.Content);
  }
  return Promise.resolve(type + ' Not Supported');
};

const processCmd = (txt: string) =>
  execPromise(txt, {
    cwd: os.homedir(),
    env: process.env,
    shell: '/usr/bin/zsh'
  });

const processNote = (txt: string) =>
  execPromise(`note -s ${txt}`, { env: process.env });

const processQuote = () =>
  quoteTable
    .query({
      orderBy: 'rand()',
      limit: 1
    })
    .then(R.head)
    .then((quote: IQuote) => `${quote.content}\n\n --${quote.author}`);
// .then((quote: IQuote) => [
//   {
//     title: `${quote.content}\n\n --${quote.author}`,
//     picurl: quote.imgUrl
//   }
// ]);

interface IMsgConfigType {
  [key: string]: (txt: string) => Promise<string>;
}

const textMsgConfig: IMsgConfigType = {
  cmd: processCmd,
  note: processNote,
  quote: processQuote
};

const processTextMessage = (content: string = '') => {
  const foundKey = R.find<string>(
    key => R.startsWith(key.toLowerCase(), content.toLocaleLowerCase()),
    R.keys<IMsgConfigType>(textMsgConfig) as ReadonlyArray<string>
  );

  if (!foundKey) {
    return Promise.resolve(content + ' Not Supported');
  }

  const txt = content.slice(foundKey.length).trim();
  return Promise.resolve(textMsgConfig[foundKey](txt));
};

export default processMessage;
