import {createReadStream} from 'fs';
import {createHash} from 'crypto';
import path from 'node:path';
import { access, constants} from 'node:fs';
import { ERROR } from './constants.js';
import { currentPath } from '../index.js';
import { showCurrentPath } from './messages.js';

export const printHash = (filename) => {
  const fullPath = path.resolve(currentPath.curPath, filename);
  access(fullPath, constants.F_OK, (err) => {
    if (err) {
      console.error(ERROR);
      showCurrentPath(currentPath.curPath);
    } else {
      const hash = createHash('sha256');
      const readStream = createReadStream(fullPath);
      readStream.on('readable', () => {
        const data = readStream.read();
        if (data)
          hash.update(data);
        else {
          console.log(hash.digest('hex'));
          showCurrentPath(currentPath.curPath);
        }
      });
    };
  });
}