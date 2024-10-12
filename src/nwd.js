import fs from "fs";
import path from "path";
import {
  checkExistsDirectory,
  checkRoot,
  formAbsolutePath,
  invalidInputException,
  operationFailedException,
} from "./errors_and_checks.js";

const HOME = process.env.HOME;
const FILE = "file";
const DIRECTORY = "directory";

const ls = (currentDir) => {
  return fs.readdirSync(currentDir).map((file, index) => {
    const isDirectory = path.extname(file);
    return {
      Name: file,
      Type: isDirectory.length > 0 ? FILE : DIRECTORY,
    };
  });
};

const up = (currentDir) => {
  const newDir = path.join(currentDir, "../");

  if (checkRoot(newDir)) {
    return newDir;
  } else {
    invalidInputException();
    return currentDir;
  }
};

const cd = (currentDir, pathToDirectory) => {
  const fullPath = formAbsolutePath(currentDir, pathToDirectory);

  if (!checkExistsDirectory(fullPath)) {
    invalidInputException();
    return currentDir;
  }

  if (checkRoot(fullPath)) {
    return fullPath;
  } else {
    invalidInputException();
    return currentDir;
  }
};

export { ls, up, cd };
