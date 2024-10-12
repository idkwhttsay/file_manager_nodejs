import { up, ls, cd } from "./nwd.js";
import path from "path";

const login = () => {
  const args = process.argv[2];
  const userName = args.slice(11);

  let __dirname = path.resolve(process.env.HOME || process.env.USER_PROFILE);

  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${__dirname}`);

  process.stdin.on("data", (chunk) => {
    const input = chunk.toString().trim();

    if (input === ".exit") {
      console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      process.exit();
    } else if (input === "up") {
      __dirname = up(__dirname);
    } else if (input === "ls") {
      console.table(ls(__dirname));
    } else if (input.slice(0, 2) === "cd") {
      const newPath = cd(__dirname, input.slice(3));
      if (newPath != null) {
        __dirname = newPath;
      }
    }

    console.log(`You are currently in ${__dirname}`);
  });
};

login();
