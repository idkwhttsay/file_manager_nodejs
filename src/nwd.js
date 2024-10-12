import fs from "fs";
import fs_promise from "fs/promises";
import path from "path";
import {
  checkExistsDirectory,
  checkRoot,
  formAbsolutePath,
  invalidInputException,
} from "./errors_and_checks.js";

const FILE = "file";
const DIRECTORY = "directory";

const ls = async (currentDir) => {
  const files = await fs_promise.readdir(currentDir);

  return files.map((file) => {
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
