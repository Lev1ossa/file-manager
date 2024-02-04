import { stdin } from 'node:process';
import { showGoodByeMessage } from "./messages.js";
import { CD_KEY, EXIT_KEY, LS_KEY, UP_KEY } from './constants.js';
import { changeDir, readDir } from './fs.js';

export const listenCli = () => {
  stdin.on('data', async (data) => {
    const inputData = data.toString().trim();
    if (inputData === EXIT_KEY) {
      showGoodByeMessage();
      process.exit();
    } else if (inputData === UP_KEY) {
      changeDir('..');
    } else if (inputData.startsWith(CD_KEY)) {
      changeDir(inputData.slice(CD_KEY.length).trim());
    } else if (inputData === LS_KEY) {
      readDir();
    }
  });
  
  stdin.on('error', () => {
    showErrorMessage();
  });

  process.on('SIGINT', () => {
    showGoodByeMessage();
    process.exit();
  });
};