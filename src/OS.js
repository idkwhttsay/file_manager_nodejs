import os from "os";
import { invalidInputException } from "./errors-and-checks.js";

const printOS = (operation) => {
  if (operation === "--EOL") {
    console.log(os.EOL);
  } else if (operation === "--cpus") {
    const cpus = os.cpus();
    const cpusTable = cpus.map((cpus) => {
      return {
        model: cpus.model,
        speed: cpus.speed,
        idle: cpus.times.idle,
        user: cpus.times.user,
        nice: cpus.times.nice,
        sys: cpus.times.sys,
        irq: cpus.times.irq,
      };
    });

    console.table(cpusTable);
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
