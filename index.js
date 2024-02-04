import { homedir } from 'os';
import { app } from './app.js';

export const currentPath = { curPath: homedir() }

app();