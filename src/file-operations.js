import {
  checkExistsFile,
  checkRoot,
  formAbsolutePath,
  invalidInputException,
  operationFailedException,
} from "./errors-and-checks.js";
import fs from "fs";
import * as console from "node:console";

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
    console.log("File reading complete");
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

  fs.writeFile(fullPath, "", () => {
    console.log("File created successfully");
  });
};

// const rename = (currentDir, pathToFile, newFileName) => {
//   const fullPathToFile = formAbsolutePath(currentDir, pathToFile);
//   const pathToRenamedFile = formAbsolutePath();
//
//   if (
//     !checkRoot(fullPath) ||
//     (!checkExistsFile(fullPath) && !checkExistsDirectory(fullPath))
//   ) {
//     invalidInputException();
//     return;
//   }
//
//   fs.rename(fullPath);
// };

export { cat, add };
