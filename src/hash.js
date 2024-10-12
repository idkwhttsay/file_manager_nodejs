import fs from "fs";
import crypto from "crypto";
import {
  invalidInputException,
  operationFailedException,
  formAbsolutePath,
  checkRoot,
  checkExistsFile,
} from "./errors_and_checks.js";

const calculateHash = (currentDir, pathToFile) => {
  const fullPath = formAbsolutePath(currentDir, pathToFile);

  if (!checkRoot(fullPath)) {
    invalidInputException();
    return;
  }

  if (!checkExistsFile(fullPath)) {
    invalidInputException();
    return;
  }

  const hash = crypto.createHash("sha256");
  const readableStream = fs.createReadStream(fullPath);

  readableStream.pipe(hash).on("finish", () => {
    console.log(`SHA 256 of a file: ${hash.digest()}`);
  });

  readableStream.on("error", () => {
    operationFailedException();
  });
};

export { calculateHash };
