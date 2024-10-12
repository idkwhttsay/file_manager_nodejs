import os from "os";

const printEOL = () => {
  console.log(os.EOL);
};

const printCpus = () => {
  console.table(os.cpus());
};

const printHomedir = () => {
  console.log(os.homedir());
};

const printUsername = () => {
  console.log(os.hostname());
};

const printArchitecture = () => {
  console.log(os.arch());
};

export { printArchitecture, printEOL, printCpus, printUsername, printHomedir };
