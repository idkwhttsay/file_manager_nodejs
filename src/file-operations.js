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

// TODO: validate paths
const rename = (currentDir, pathToFile, newFileName) => {
  const fullPathToFile = formAbsolutePath(currentDir, pathToFile);
  const pathToRenamedFile = formAbsolutePath(
    path.join(fullPathToFile, "../"),
    newFileName,
  );

  fs.rename(fullPathToFile, pathToRenamedFile, (error) => {
    if (error) {
      operationFailedException();
    }

    successMessage();
  });
};

const remove = (currentDir, pathToFile) => {
  const fullPath = formAbsolutePath(currentDir, pathToFile);

  if (!checkRoot(fullPath) || !checkExistsFile(fullPath)) {
    invalidInputException();
    return;
  }

  fs.rm(fullPath, (error) => {
    if (error) {
      operationFailedException();
      return;
    }

    successMessage();
  });
};

const copy = (currentDir, pathToFile, pathToNewDirectory) => {
  const fullPathToFile = formAbsolutePath(currentDir, pathToFile);
  const fullPathToNewDirectory = formAbsolutePath(
    currentDir,
    pathToNewDirectory,
  );

  if (
    !checkRoot(fullPathToFile) ||
    !checkExistsFile(fullPathToFile) ||
    !checkRoot(fullPathToNewDirectory) ||
    !checkExistsDirectory(fullPathToNewDirectory)
  ) {
    invalidInputException();
    return;
  }

  const newFilePath = path.join(
    fullPathToNewDirectory,
    path.basename(fullPathToFile),
  );

  const readStream = fs.createReadStream(fullPathToFile);
  const writeStream = fs.createWriteStream(newFilePath);

  readStream.pipe(writeStream);

  readStream.on("end", () => {
    successMessage();
  });

  readStream.on("error", () => {
    operationFailedException();
  });

  writeStream.on("error", () => {
    operationFailedException();
  });
};

const move = (currentDir, pathToFile, pathToNewDirectory) => {
  const fullPathToFile = formAbsolutePath(currentDir, pathToFile);
  const fullPathToNewDirectory = formAbsolutePath(
    currentDir,
    pathToNewDirectory,
  );

  if (
    !checkRoot(fullPathToFile) ||
    !checkExistsFile(fullPathToFile) ||
    !checkRoot(fullPathToNewDirectory) ||
    !checkExistsDirectory(fullPathToNewDirectory)
  ) {
    invalidInputException();
    return;
  }

  const newFilePath = path.join(
    fullPathToNewDirectory,
    path.basename(fullPathToFile),
  );

  const readStream = fs.createReadStream(fullPathToFile);
  const writeStream = fs.createWriteStream(newFilePath);

  readStream.pipe(writeStream);

  readStream.on("end", () => {
    fs.rm(fullPathToFile, (error) => {
      if (error) {
        operationFailedException();
        return;
      }

      successMessage();
    });
  });

  readStream.on("error", () => {
    operationFailedException();
  });

  writeStream.on("error", () => {
    operationFailedException();
  });
};

export { cat, add, rename, remove, copy, move };
