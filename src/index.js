import { up, ls, cd } from "./nwd.js";
import { calculateHash } from "./hash.js";
import path from "path";
import { printOS } from "./OS.js";
import { compress, decompress } from "./brzip.js";
import { add, cat, copy, move, remove, rename } from "./file-operations.js";
import {
  invalidInputException,
  printCurrentFolder,
  printHelp,
} from "./errors-and-checks.js";

const YELLOW = "\x1b[33m";
const DEFAULT_COLOR = "\x1b[0m";

const login = () => {
  const args = process.argv.slice(2);
  let userName;
  args.map((name, index) => {
    const values = name.split("=");
    if (values[0] === "--username") {
      userName = values[1];
    }
  });

  if (userName.length === 0) {
    invalidInputException();
    return;
  }

  let __dirname = path.resolve(process.env.HOME || process.env.USER_PROFILE);

  console.log(
    `Welcome to the File Manager, ${YELLOW}${userName}${DEFAULT_COLOR}!`,
  );
  console.log(
    `Type ${YELLOW}'.exit'${DEFAULT_COLOR} to exit the File Manager.`,
  );
  console.log(
    `Type ${YELLOW}'--help'${DEFAULT_COLOR} to see list of available commands.`,
  );

  printCurrentFolder(__dirname);

  process.stdin.on("data", async (chunk) => {
    const input = chunk.toString().trim();
    const splitInput = input.split(" ");

    if (splitInput[0] === ".exit" && splitInput.length === 1) {
      console.log(
        `Thank you for using File Manager, ${YELLOW}${userName}${DEFAULT_COLOR}, goodbye!`,
      );
      process.exit();
    } else if (splitInput[0] === "--help" && splitInput.length === 1) {
      printHelp();
    } else if (splitInput[0] === "up" && splitInput.length === 1) {
      __dirname = up(__dirname);
    } else if (splitInput[0] === "ls" && splitInput.length === 1) {
      console.table(await ls(__dirname));
    } else if (splitInput[0] === "cd" && splitInput.length === 2) {
      const newPath = cd(__dirname, splitInput[1]);
      if (newPath != null) {
        __dirname = newPath;
      }
    } else if (splitInput[0] === "os" && splitInput.length === 2) {
      printOS(splitInput[1]);
    } else if (splitInput[0] === "hash" && splitInput.length === 2) {
      calculateHash(__dirname, splitInput[1]);
    } else if (splitInput[0] === "compress" && splitInput.length === 3) {
      compress(__dirname, splitInput[1], splitInput[2]);
    } else if (splitInput[0] === "decompress" && splitInput.length === 3) {
      decompress(__dirname, splitInput[1], splitInput[2]);
    } else if (splitInput[0] === "cat" && splitInput.length === 2) {
      cat(__dirname, splitInput[1]);
    } else if (splitInput[0] === "add" && splitInput.length === 2) {
      add(__dirname, splitInput[1]);
    } else if (splitInput[0] === "rn" && splitInput.length === 3) {
      rename(__dirname, splitInput[1], splitInput[2]);
    } else if (splitInput[0] === "cp" && splitInput.length === 3) {
      copy(__dirname, splitInput[1], splitInput[2]);
    } else if (splitInput[0] === "rm" && splitInput.length === 2) {
      remove(__dirname, splitInput[1]);
    } else if (splitInput[0] === "mv" && splitInput.length === 3) {
      move(__dirname, splitInput[1], splitInput[2]);
    } else {
      invalidInputException();
    }

    printCurrentFolder(__dirname);
  });
};

login();
