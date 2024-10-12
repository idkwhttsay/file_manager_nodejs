import path from "path";
import fs from "fs";
import * as console from "node:console";

const HOME = path.resolve(process.env.HOME || process.env.USER_PROFILE);
const ERROR_COLOR = "\x1b[31m";
const DEFAULT_COLOR = "\x1b[0m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";

const commands = [
  { command: "up", description: "Go upper from current directory" },
  {
    command: "cd path_to_directory",
    description:
      "Go to dedicated folder from current directory (path_to_directory can be relative or absolute)",
  },
  {
    command: "cat path_to_file",
    description: "List of all files and folders in current directory",
  },
  {
    command: "cat path_to_file",
    description: "Read file and print it's content in console",
  },
  {
    command: "add new_file_name",
    description: "Create empty file in current working directory",
  },
  {
    command: "rn path_to_file new_filename",
    description: "Rename file",
  },
  {
    command: "cp path_to_file path_to_new_directory",
    description: "Copy file",
  },
  {
    command: "mv path_to_file path_to_new_directory",
    description: "Move file",
  },
  { command: "os --EOL", description: "Get EOL" },
  { command: "os --cpus", description: "Get host machine CPUs info " },
  {
    command: "os --homedir",
    description: "Get home directory and print it to console",
  },
  { command: "os --username", description: "Get current system user name" },
  { command: "os --architecture", description: "Get CPU architecture" },
  {
    command: "hash path_to_file",
    description: "Calculate hash for file and print it into console",
  },
  {
    command: "compress path_to_file path_to_destination",
    description: "Compress file",
  },
  {
    command: "decompress path_to_file path_to_destination",
    description: "Decompress file",
  },
];

const formAbsolutePath = (currentDir, pathToDir) => {
  let resultPath;
  if (!pathToDir.startsWith(HOME)) {
    resultPath = path.normalize(path.join(currentDir, pathToDir));
  } else {
    resultPath = pathToDir;
  }

  return resultPath;
};

const printHelp = () => {
  commands.map((value) => {
    console.log(
      `${YELLOW}${value.command}${DEFAULT_COLOR}: ${value.description}`,
    );
  });
};

const checkRoot = (absolutePath) => {
  return absolutePath.startsWith(HOME);
};

const checkExistsDirectory = (pathToDirectory) => {
  return (
    fs.existsSync(pathToDirectory) && fs.statSync(pathToDirectory).isDirectory()
  );
};

const checkExistsFile = (pathToFile) => {
  return fs.existsSync(pathToFile) && !fs.statSync(pathToFile).isDirectory();
};

const operationFailedException = () => {
  console.log(`${ERROR_COLOR}Operation Failed${DEFAULT_COLOR}`);
};

const invalidInputException = () => {
  console.log(`${ERROR_COLOR}Invalid Input${DEFAULT_COLOR}`);
};

const printCurrentFolder = (currentDir) => {
  console.log(`You are currently in ${YELLOW}${currentDir}${DEFAULT_COLOR}`);
};

const successMessage = () => {
  console.log(`${GREEN}Operation performed successfully${DEFAULT_COLOR}`);
};

export {
  operationFailedException,
  invalidInputException,
  formAbsolutePath,
  checkRoot,
  checkExistsFile,
  checkExistsDirectory,
  printCurrentFolder,
  successMessage,
  printHelp,
};
