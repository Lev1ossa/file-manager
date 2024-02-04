import { getUserName } from "./utils.js"

export const showGreetingsMessage = () => {
  console.log(`Welcome to the File Manager, ${getUserName()}!`);
}