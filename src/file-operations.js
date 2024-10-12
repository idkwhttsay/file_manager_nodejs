import {
  checkExistsDirectory,
  checkExistsFile,
  checkRoot,
  formAbsolutePath,
  invalidInputException,
  operationFailedException,
  successMessage,
} from "./errors-and-checks.js";
import fs from "fs";
import * as console from "node:console";
import path from "path";

const cat = (currentDir, pathToFile) => {
  const fullPathToFile = formAbsolutePath(currentDir, pathToFile);

  if (!checkRoot(fullPathToFile) || !checkExistsFile(fullPathToFile)) {
    invalidInputException();
    return;
  }

  const readStream = fs.createReadStream(fullPathToFile, "utf8");

  readStream.on("data", (chunk) => {
    console.log(chunk);
  });

  readStream.on("end", () => {
    successMessage();
  });

  readStream.on("error", () => {
    operationFailedException();
  });
};

const add = (currentDir, fileName) => {
  const fullPath = formAbsolutePath(currentDir, fileName);

  if (!checkRoot(fullPath) || checkExistsFile(fullPath)) {
    invalidInputException();
    return;
  }

  fs.writeFile(fullPath, "", (error) => {
    if (error) {
      operationFailedException();
    }

    successMessage();
  });
};

const rename = (currentDir, pathToFile, newFileName) => {
  const fullPathToFile = formAbsolutePath(currentDir, pathToFile);
  const pathToRenamedFile = formAbsolutePath(
    path.join(fullPathToFile, "../"),
    newFileName,
  );

  console.log(fullPathToFile);
  console.log(pathToRenamedFile);

  fs.rename(fullPathToFile, pathToRenamedFile, (error) => {
    if (error) {
      operationFailedException();
    }

    successMessage();
  });
};

export { cat, add, rename };
