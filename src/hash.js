import fs from "fs";
import crypto from "crypto";
import {
  invalidInputException,
  operationFailedException,
  formAbsolutePath,
  checkRoot,
  checkExistsFile,
  successMessage,
} from "./errors-and-checks.js";

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
    successMessage();
    console.log(`SHA 256 of a file: ${hash.digest()}`);
  });

  readableStream.on("error", () => {
    operationFailedException();
  });
};

export { calculateHash };
