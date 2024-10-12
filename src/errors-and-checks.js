import path from "path";
import fs from "fs";
import * as console from "node:console";

const HOME = path.resolve(process.env.HOME || process.env.USER_PROFILE);
const ERROR_COLOR = "\x1b[31m";
const DEFAULT_COLOR = "\x1b[0m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";

const formAbsolutePath = (currentDir, pathToDir) => {
  let resultPath;
  if (!pathToDir.startsWith(HOME)) {
    resultPath = path.normalize(path.join(currentDir, pathToDir));
  } else {
    resultPath = pathToDir;
  }

  return resultPath;
};

const checkRoot = (absolutePath) => {
  return absolutePath.startsWith(HOME);
};

const checkExistsDirectory = (pathToDirectory) => {
  return (
    fs.existsSync(pathToDirectory) && path.extname(pathToDirectory).length === 0
  );
};

const checkExistsFile = (pathToFile) => {
  return fs.existsSync(pathToFile) && path.extname(pathToFile).length !== 0;
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
};
