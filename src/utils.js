import { USERNAME_PREFIX } from "./constants.js";

export const getUserName = () => {
  const args = process.argv.slice(2);
  const usernameArg = args.find((item) => item.startsWith(USERNAME_PREFIX));
  const username = usernameArg ? usernameArg.slice(USERNAME_PREFIX.length) : '';
  return username;
}
