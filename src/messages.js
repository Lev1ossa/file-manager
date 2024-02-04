import { getUserName } from "./utils.js"

export const showGreetingsMessage = () => {
  console.log(`Welcome to the File Manager, ${getUserName()}!`);
}

export const showGoodByeMessage = () => {
  console.log(`Thank you for using File Manager, ${getUserName()}, goodbye!`);
}

export const showErrorMessage = () => {
  console.error('Invalid input, try again!');
}