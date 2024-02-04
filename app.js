import { showGreetingsMessage } from "./src/messages.js";
import { listenCli } from './src/listenCli.js';

export const app = () => {
  showGreetingsMessage();
  listenCli();
};
