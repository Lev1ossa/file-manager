import { EOL } from 'node:os';
import { createReadStream, createWriteStream, access, constants } from 'node:fs';
import { writeFile, unlink, rename } from 'node:fs/promises';
import { stdout } from 'node:process';
import path from 'node:path';
import { currentPath } from "../index.js";
import { showCurrentPath } from './messages.js';
import { ERROR } from './constants.js';
import { parseArgs } from './utils.js';

export const readFileWithStream = async (pathTo) => {
  const newPath = path.resolve(currentPath.curPath, pathTo);
  const readStream = createReadStream(newPath, 'utf-8');
  readStream.on('data', (data) => {
    stdout.write(data + EOL);
    showCurrentPath(currentPath.curPath);
  });
  readStream.on('error', () => {
    console.error(ERROR);
    showCurrentPath(newPath);
  });
};

export const createNewFile = async (fileName) => {
  const newPath = path.resolve(currentPath.curPath, fileName);
  access(newPath, constants.F_OK, (err) => {
    if (err) {
        writeFile(newPath, '')
        .then(() => showCurrentPath(currentPath.curPath))
        .catch(() => console.error(ERROR));
    } else {
      console.error(ERROR);
    }
  });
}

export const renameFile = async (argsString) => {
  try {
    const args = parseArgs(argsString);
    const fileOldPath = path.resolve(currentPath.curPath, args[0]);
    const fileDir = path.dirname(fileOldPath);
    const fileNewPath = path.resolve(fileDir, args[1]);
    access(fileOldPath, constants.F_OK, (err) => {
      if (err) {
        console.error(ERROR);
      } else {
        access(fileNewPath, constants.F_OK, (err) => {
          if (err) {
            rename(fileOldPath, fileNewPath)
            .then(() => showCurrentPath(currentPath.curPath))
            .catch(() => console.error(ERROR));
          } else {
            console.error(ERROR);
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const copyFile = async (argsString) => {
  try {
    const args = parseArgs(argsString);
    const fileOldPath = path.resolve(currentPath.curPath, args[0]);
    const fileName = path.basename(fileOldPath);
    const fileNewPath = path.resolve(args[1], fileName);
    const readStream = createReadStream(fileOldPath, 'utf-8');
    readStream.on('error', () => console.error(ERROR));
    const writeStream = createWriteStream(fileNewPath);
    writeStream.on('error', () => console.error(ERROR));
    readStream.pipe(writeStream);
    showCurrentPath(currentPath.curPath);
  } catch (error) {
    console.error(ERROR);
    showCurrentPath(currentPath.curPath);
  }
};

export const deleteFile = async (filename) => {
  const fullPath = path.resolve(currentPath.curPath, filename);
  access(fullPath, constants.F_OK, (err) => {
    if (err) {
      console.error(ERROR);
    } else {
      unlink(fullPath)
      .then(() => showCurrentPath(currentPath.curPath))
      .catch(() => {
        console.error(ERROR);
        showCurrentPath(currentPath.curPath);
      })
    };
  });
};

export const moveFile = async (argsString) => {
  try {
    const args = parseArgs(argsString);
    const fileOldPath = path.resolve(currentPath.curPath, args[0]);
    copyFile(argsString);
    deleteFile(fileOldPath);
  } catch {
    console.error(ERROR);
    showCurrentPath(currentPath.curPath);
  }
};