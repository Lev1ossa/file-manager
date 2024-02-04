import { stdin } from 'node:process';
import { showGoodByeMessage } from "./messages.js";
import { EXIT_KEY } from './constants.js';

export const listenCli = () => {
  stdin.on('data', async (data) => {
    const inputData = data.toString().trim();
    if (inputData === EXIT_KEY) {
      showGoodByeMessage();
      process.exit();
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