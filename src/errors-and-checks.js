import path from "path";
import fs from "fs";

const HOME = process.env.HOME;

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
  console.log("Operation failed");
};

const invalidInputException = () => {
  console.log("Invalid Input");
};

export {
  operationFailedException,
  invalidInputException,
  formAbsolutePath,
  checkRoot,
  checkExistsFile,
  checkExistsDirectory,
};
