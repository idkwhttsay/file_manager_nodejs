import fs from "fs";
import path from "path";
import zlib from "zlib";
import {
  checkExistsDirectory,
  checkExistsFile,
  checkRoot,
  formAbsolutePath,
  invalidInputException,
  operationFailedException,
  successMessage,
} from "./errors-and-checks.js";

const compress = (currentDir, pathToFile, pathToDestination) => {
  const fullPathToFile = formAbsolutePath(currentDir, pathToFile);
  let fullPathToDestination = formAbsolutePath(currentDir, pathToDestination);

  if (!checkExistsFile(fullPathToFile) || !checkRoot(fullPathToFile)) {
    invalidInputException();
    return;
  }

  if (
    !checkExistsDirectory(fullPathToDestination) ||
    !checkRoot(fullPathToDestination)
  ) {
    invalidInputException();
    return;
  }

  fullPathToDestination = path.join(fullPathToDestination, "compressed.br");

  const readStream = fs.createReadStream(fullPathToFile);
  const writeStream = fs.createWriteStream(fullPathToDestination);

  const brotli = zlib.createBrotliCompress();

  readStream
    .pipe(brotli)
    .pipe(writeStream)
    .on("finish", () => {
      successMessage();
    });

  readStream.on("error", () => {
    operationFailedException();
  });
};

const decompress = (currentDir, pathToFile, pathToDestination) => {
  const fullPathToFile = formAbsolutePath(currentDir, pathToFile);
  let fullPathToDestination = formAbsolutePath(currentDir, pathToDestination);

  if (
    !checkExistsFile(fullPathToFile) ||
    !checkRoot(fullPathToFile) ||
    path.extname(fullPathToFile) !== ".br"
  ) {
    invalidInputException();
    return;
  }

  if (
    !checkExistsDirectory(fullPathToDestination) ||
    !checkRoot(fullPathToDestination)
  ) {
    invalidInputException();
    return;
  }

  fullPathToDestination = path.join(fullPathToDestination, "decompressed.txt");

  const readStream = fs.createReadStream(fullPathToFile);
  const writeStream = fs.createWriteStream(fullPathToDestination);

  const brotli = zlib.createBrotliDecompress();

  readStream
    .pipe(brotli)
    .pipe(writeStream)
    .on("finish", () => {
      successMessage();
    });

  readStream.on("error", () => {
    operationFailedException();
  });
};

export { compress, decompress };
