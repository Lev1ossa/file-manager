import { showCurrentPath, showGreetingsMessage } from "./src/messages.js";
import { listenCli } from './src/listenCli.js';
import { currentPath } from "./index.js";

export const app = () => {
  showGreetingsMessage();
  showCurrentPath(currentPath.curPath);
  listenCli();
};
