import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import {
  checkExistsDirectory,
  checkRoot,
  formAbsolutePath,
  invalidInputException,
} from "./errors-and-checks.js";

const FILE = "file";
const DIRECTORY = "directory";

const ls = async (currentDir) => {
  const content = await fs.readdir(currentDir);

  const entries = [];

  content.forEach((file) => {
    const filePath = path.join(currentDir, file);
    const stat = fsSync.lstatSync(filePath);

    if (stat.isDirectory()) {
      entries.push({ Name: file, Type: DIRECTORY });
    } else {
      entries.push({ Name: file, Type: FILE });
    }
  });

  entries.sort((a, b) => {
    if (a.Type === b.Type) {
      return a.Name.localeCompare(b.Name);
    }
    return a.Type === DIRECTORY ? -1 : 1;
  });

  return entries;
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

  if (!checkRoot(fullPath) || !checkExistsDirectory(fullPath)) {
    invalidInputException();
    return currentDir;
  }

  return fullPath;
};

export { ls, up, cd };
