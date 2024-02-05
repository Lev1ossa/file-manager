import { EOL, cpus, homedir, userInfo, arch } from 'node:os';
import { showCurrentPath } from './messages.js';
import { currentPath } from '../index.js';

export const printEOL = () => {
  console.log(`Current OS EOL is "${EOL}"`);
  showCurrentPath(currentPath.curPath);
};

export const printCPUS = () => {
  const currentCPUS = cpus().map((item, idx) => {return {number: idx + 1, model: item.model, clockRate: `${(item.speed / 1000).toFixed(2)} GHz`}});
  console.log(`Number of CPUS: ${currentCPUS.length}`);
  console.table(currentCPUS);
  showCurrentPath(currentPath.curPath);
};

export const printHomeDir = () => {
  console.log(`Homedir is "${homedir()}"`);
  showCurrentPath(currentPath.curPath);
};

export const printUserName = () => {
  console.log(`System username is "${userInfo().username}"`);
  showCurrentPath(currentPath.curPath);
};

export const printArchitecture = () => {
  console.log(`Current architecture is "${arch()}"`);
  showCurrentPath(currentPath.curPath);
};