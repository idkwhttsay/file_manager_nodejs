import os from "os";
import { up } from "./nwd/up.js";
import { ls } from "./nwd/ls.js";
import { cd } from "./nwd/cd.js";

const login = () => {
  const args = process.argv[2];
  const userName = args.slice(11);

  let __dirname = os.homedir();

  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${__dirname}`);

  process.stdin.on("data", (chunk) => {
    chunk = chunk.toString().trim();
    const input = chunk.split(" ");

    if (input[0] === ".exit") {
      console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      process.exit();
    } else if (input[0] === "up") {
      __dirname = up(__dirname);
      console.log(`You are currently in ${__dirname}`);
    } else if (input[0] === "ls") {
      console.table(ls(__dirname));
    } else if (input[0] === "cd") {
      cd();
    }
  });
};

login();
