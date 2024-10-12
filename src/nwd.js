import fs from "fs";
import fs_promise from "fs/promises";
import path from "path";
import { invalidInputException, operationFailedException } from "./errors.js";

const HOME = process.env.HOME;

const ls = async (currentDir) => {
  const files = await fs_promise.readdir(currentDir);

  return files.map((file) => {
    const isDirectory = path.extname(file);
    return {
      Name: file,
      Type: isDirectory.length > 0 ? "file" : "directory",
    };
  });
};

const up = (currentDir) => {
  const newDir = path.join(currentDir, "../");

  if (newDir.startsWith(HOME)) {
    return newDir;
  } else {
    operationFailedException();
    return currentDir;
  }
};

const cd = (currentDir, pathToDirectory) => {
  pathToDirectory = path.normalize(path.join(currentDir, pathToDirectory));
  if (!fs.existsSync(pathToDirectory)) {
    invalidInputException();
    return null;
  }

  if (
    pathToDirectory.startsWith(HOME) &&
    path.extname(pathToDirectory).length === 0
  ) {
    return pathToDirectory;
  } else {
    operationFailedException();
    return currentDir;
  }
};

export { ls, up, cd };
