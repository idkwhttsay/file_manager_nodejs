import { up, ls, cd } from "./nwd.js";
import { calculateHash } from "./hash.js";
import path from "path";
import { printOS } from "./OS.js";
import { compress, decompress } from "./brzip.js";

const login = () => {
  const args = process.argv[2];
  const userName = args.slice(11);

  let __dirname = path.resolve(process.env.HOME || process.env.USER_PROFILE);

  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${__dirname}`);

  process.stdin.on("data", async (chunk) => {
    const input = chunk.toString().trim();

    if (input === ".exit") {
      console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      process.exit();
    } else if (input === "up") {
      __dirname = up(__dirname);
    } else if (input === "ls") {
      console.table(await ls(__dirname));
    } else if (input.slice(0, 2) === "cd") {
      const newPath = cd(__dirname, input.slice(3));
      if (newPath != null) {
        __dirname = newPath;
      }
    } else if (input.slice(0, 2) === "os") {
      printOS(input.slice(3));
    } else if (input.slice(0, 4) === "hash") {
      calculateHash(__dirname, input.slice(5));
    } else if (input.slice(0, 8) === "compress") {
      const splitInput = input.split(" ");
      // TODO: validate splitInput
      compress(__dirname, splitInput[1].toString(), splitInput[2].toString());
    } else if (input.slice(0, 10) === "decompress") {
      const splitInput = input.split(" ");
      decompress(__dirname, splitInput[1].toString(), splitInput[2].toString());
    }

    console.log(`You are currently in ${__dirname}\n`);
  });
};

login();
