import { stdin } from 'node:process';
import { showCurrentPath, showErrorMessage, showGoodByeMessage } from "./messages.js";
import { ADD_KEY, CAT_KEY, CD_KEY, CP_KEY, EXIT_KEY, HASH_KEY, LS_KEY, MV_KEY, OS_ARCHITECTURE_ARG, OS_CPUS_ARG, OS_EOL_ARG, OS_HOMEDIR_ARG, OS_KEY, OS_USERNAME_ARG, RM_KEY, RN_KEY, UP_KEY } from './constants.js';
import { changeDir, readDir } from './nwd.js';
import { copyFile, createNewFile, deleteFile, moveFile, readFileWithStream, renameFile } from './files.js';
import { currentPath } from '../index.js';
import { printArchitecture, printCPUS, printEOL, printHomeDir, printUserName } from './os.js';
import { printHash } from './hash.js';

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
    } else if (inputData.startsWith(CAT_KEY)) {
      readFileWithStream(inputData.slice(CAT_KEY.length).trim());
    } else if (inputData.startsWith(ADD_KEY)) {
      createNewFile(inputData.slice(ADD_KEY.length).trim());
    } else if (inputData.startsWith(RN_KEY)) {
      renameFile(inputData.slice(RN_KEY.length).trim());
    } else if (inputData.startsWith(CP_KEY)) {
      copyFile(inputData.slice(CP_KEY.length).trim());
    } else if (inputData.startsWith(MV_KEY)) {
      moveFile(inputData.slice(MV_KEY.length).trim());
    } else if (inputData.startsWith(RM_KEY)) {
      deleteFile(inputData.slice(RM_KEY.length).trim());
    } else if (inputData.startsWith(OS_KEY)) {
      const osArg = inputData.slice(OS_KEY.length).trim();
      if (osArg === OS_EOL_ARG) {
        printEOL();
      } else if (osArg === OS_CPUS_ARG) {
        printCPUS();
      } else if (osArg === OS_HOMEDIR_ARG) {
        printHomeDir();
      } else if (osArg === OS_USERNAME_ARG) {
        printUserName();
      } else if (osArg === OS_ARCHITECTURE_ARG) {
        printArchitecture();
      } else {
        showErrorMessage();
        showCurrentPath(currentPath.curPath);
      }
    } else if (inputData.startsWith(HASH_KEY)) {
      printHash(inputData.slice(HASH_KEY.length).trim());
    } else {
      showErrorMessage();
      showCurrentPath(currentPath.curPath);
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