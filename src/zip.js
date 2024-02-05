import { createReadStream, createWriteStream, access, constants } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import path from 'node:path';
import { currentPath } from "../index.js";
import { showCurrentPath } from "./messages.js";
import { parseArgs } from "./utils.js";
import { ERROR } from './constants.js';

export const compressFile = async (argsString) => {
  try {
    const args = parseArgs(argsString);
    const fileOldPath = path.resolve(currentPath.curPath, args[0]);
    const fileName = path.basename(fileOldPath);
    const fileNewPath = path.resolve(args[1]);
    const fileNewPathWithFilename = path.resolve(fileNewPath, fileName);
    
    access(fileOldPath, constants.F_OK, (err) => {
      if (err) {
        console.error(ERROR);
        showCurrentPath(currentPath.curPath);
      } else {
        access(fileNewPath, constants.F_OK, (err) => {
          if (err) {
            console.error(ERROR);
            showCurrentPath(currentPath.curPath);
          } else {
            const readStream = createReadStream(fileOldPath);
            const writeStream = createWriteStream(fileNewPathWithFilename + '.gz');
            const brotliCompress = createBrotliCompress();
            readStream.pipe(brotliCompress).pipe(writeStream);
            showCurrentPath(currentPath.curPath);
          }
        });
      }
    });
    
  } catch {
    console.error(ERROR);
    showCurrentPath(currentPath.curPath);
  }
};

export const decompressFile = async (argsString) => {
  try {
    const args = parseArgs(argsString);
    const fileOldPath = path.resolve(currentPath.curPath, args[0]);
    const fileName = path.basename(fileOldPath);
    const fileNewPath = path.resolve(currentPath.curPath, args[1]);
    const fileNewPathWithFilename = path.resolve(currentPath.curPath, args[1], fileName.slice(0, fileName.length - 3));
    access(fileOldPath, constants.F_OK, (err) => {
      if (err) {
        console.error(ERROR);
        showCurrentPath(currentPath.curPath);
      } else {
        access(fileNewPath, constants.F_OK, (err) => {
          if (err) {
            console.error(ERROR);
            showCurrentPath(currentPath.curPath);
          } else {
            const readStream = createReadStream(fileOldPath);
            const writeStream = createWriteStream(fileNewPathWithFilename);
            const brotliDecompress = createBrotliDecompress();
            readStream.pipe(brotliDecompress).pipe(writeStream);
            showCurrentPath(currentPath.curPath);
          }
        });
      }
    });
  } catch {
    console.error(ERROR);
    showCurrentPath(currentPath.curPath);
  }
};