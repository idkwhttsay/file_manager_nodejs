import path from "path";
import fs from "fs";
import crypto from "crypto";
import { invalidInputException, operationFailedException } from "./errors.js";

const calculateHash = (currentDir, pathToFile) => {
  const fullPath = path.normalize(path.join(currentDir, pathToFile));

  // TODO: Check if User not above root folder

  if (!fs.existsSync(fullPath) || path.extname(fullPath).length === 0) {
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
