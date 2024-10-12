import { up, ls, cd } from "./nwd.js";
import { calculateHash } from "./hash.js";
import path from "path";
import {
  printArchitecture,
  printCpus,
  printEOL,
  printHomedir,
  printUsername,
} from "./OS.js";

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
    } else if (input.slice(0, 2) === "os") {
      if (input.slice(3) === "--EOL") {
        printEOL();
      } else if (input.slice(3) === "--cpus") {
        printCpus();
      } else if (input.slice(3) === "--homedir") {
        printHomedir();
      } else if (input.slice(3) === "--username") {
        printUsername();
      } else if (input.slice(3) === "--architecture") {
        printArchitecture();
      } else {
        console.log("Invalid input");
      }
    } else if (input.slice(0, 4) === "hash") {
      calculateHash(__dirname, input.slice(5));
    }

    console.log(`You are currently in ${__dirname}\n`);
  });
};

login();
