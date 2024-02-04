import { access, constants} from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { currentPath } from "../index.js";
import { showCurrentPath } from './messages.js';

export const changeDir = (pathTo) => {
  const newPath = path.resolve(currentPath.curPath, pathTo);
  access(newPath, constants.F_OK, (err) => {
    if (err) {
      console.error('Operation failed');
      showCurrentPath(currentPath.curPath);
    } else {
      currentPath.curPath = newPath;
      showCurrentPath(newPath);
    }
  });
};

export const readDir = () => {
  access(currentPath.curPath, constants.F_OK, (err) => {
    readdir(currentPath.curPath, { withFileTypes: true })
    .then((items) => {
      const tableData = items.map((item) => item.isDirectory() ? {Name: item.name, Type: 'Directory'} : {Name: item.name, Type: 'File'});
      const directorysArr = tableData.filter((item) => item.Type === 'Directory').sort();
      const FilesArr = tableData.filter((item) => item.Type === 'File').sort();
      console.table([...directorysArr, ...FilesArr]);
      showCurrentPath(currentPath.curPath);
    })
  });
};
