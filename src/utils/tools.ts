import { exec } from 'child_process';

export const execPromise = (
  cmd: string,
  config: object = {}
): Promise<string> =>
  new Promise((res, rej) => {
    exec(
      cmd,
      { encoding: 'utf8', ...config },
      (err, info) => (err ? rej(err) : res(info))
    );
  });
