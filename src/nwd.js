import { access, constants, lstat} from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { currentPath } from "../index.js";
import { showCurrentPath } from './messages.js';
import { ERROR } from './constants.js';

export const changeDir = (pathTo) => {
  const newPath = path.resolve(currentPath.curPath, pathTo);
  access(newPath, constants.F_OK, (err) => {
    lstat(newPath, (_, stat) => {
      if (err) {
        console.error(ERROR);
        showCurrentPath(currentPath.curPath);
      } else {
        if (stat.isFile()) {
          console.error(ERROR);
          showCurrentPath(currentPath.curPath);
        } else {
          access(newPath, constants.F_OK, (err) => {
            if (err) {
              console.error(ERROR);
              showCurrentPath(currentPath.curPath);
            } else {
              currentPath.curPath = newPath;
              showCurrentPath(newPath);
            }
          });
        };
      };
    });
  });
};

export const readDir = () => {
  access(currentPath.curPath, constants.F_OK, (err) => {
    readdir(currentPath.curPath, { withFileTypes: true })
    .then((items) => {
      const tableData = items.map((item) => item.isDirectory() ? {Name: item.name, Type: 'Directory'} : {Name: item.name, Type: 'File'});
      const directorysArr = tableData.filter((item) => item.Type === 'Directory').sort();
      const filesArr = tableData.filter((item) => item.Type === 'File').sort();
      console.table([...directorysArr, ...filesArr]);
      showCurrentPath(currentPath.curPath);
    })
  });
};
