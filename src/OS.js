import os from "os";
import { invalidInputException } from "./errors-and-checks.js";

const printOS = (operation) => {
  if (operation === "--EOL") {
    console.log(os.EOL);
  } else if (operation === "--cpus") {
    console.table(os.cpus());
  } else if (operation === "--homedir") {
    console.log(os.homedir());
  } else if (operation === "--username") {
    console.log(os.hostname());
  } else if (operation === "--architecture") {
    console.log(os.arch());
  } else {
    invalidInputException();
  }
};

export { printOS };
