import { up, ls, cd } from "./nwd.js";
import { calculateHash } from "./hash.js";
import path from "path";
import { printOS } from "./OS.js";
import { compress, decompress } from "./brzip.js";
import { add, cat, copy, move, remove, rename } from "./file-operations.js";
import {
  invalidInputException,
  printCurrentFolder,
} from "./errors-and-checks.js";

const login = () => {
  const args = process.argv[2];
  const userName = args.slice(11);

  let __dirname = path.resolve(process.env.HOME || process.env.USER_PROFILE);

  console.log(`Welcome to the File Manager, ${userName}!`);
  printCurrentFolder(__dirname);

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
      // TODO: validate splitInput
      decompress(__dirname, splitInput[1].toString(), splitInput[2].toString());
    } else if (input.slice(0, 3) === "cat") {
      cat(__dirname, input.slice(4));
    } else if (input.slice(0, 3) === "add") {
      add(__dirname, input.slice(4));
    } else if (input.slice(0, 2) === "rn") {
      const splitInput = input.split(" ");
      rename(__dirname, splitInput[1].toString(), splitInput[2].toString());
    } else if (input.slice(0, 2) === "cp") {
      const splitInput = input.split(" ");
      copy(__dirname, splitInput[1], splitInput[2]);
    } else if (input.slice(0, 2) === "rm") {
      const splitInput = input.split(" ");
      remove(__dirname, splitInput[1]);
    } else if (input.slice(0, 2) === "mv") {
      const splitInput = input.split(" ");
      move(__dirname, splitInput[1], splitInput[2]);
    } else {
      invalidInputException();
    }

    printCurrentFolder(__dirname);
  });
};

login();
