import fs from "fs";
import path from "path";
import zlib from "zlib";
import {
  invalidInputException,
  operationFailedException,
} from "./errors_and_checks.js";

const compress = (currentDir, pathToFile, pathToDestination) => {
  // TODO: consider absolute paths

  const fullPathToFile = path.normalize(path.join(currentDir, pathToFile));
  const fullPathToDestination = path.normalize(
    path.join(currentDir, pathToDestination, "archive.br"),
  );

  if (!fs.existsSync(fullPathToFile)) {
    invalidInputException();
    return;
  }

  const readableStream = fs.createReadStream(fullPathToFile);
  const writableStream = fs.createWriteStream(fullPathToDestination);

  const brotliCompression = zlib.createBrotliCompress();

  // TODO try/catch, error = operationFailedException
  readableStream
    .pipe(brotliCompression)
    .pipe(writableStream)
    .on("finish", () => {
      console.log("File successfully compressed.");
    });
};

// TODO: Fix decompress
const decompress = (currentDir, pathToFile, pathToDestination) => {
  // TODO: consider absolute paths
  const fullPathToFile = path.normalize(path.join(currentDir, pathToFile));
  const fullPathToDestination = path.normalize(
    path.join(currentDir, pathToDestination),
  );

  // TODO: make separate function for checking
  if (
    !fs.existsSync(fullPathToFile) ||
    path.extname(fullPathToFile) !== ".br"
  ) {
    invalidInputException();
    return;
  }

  const readableStream = fs.createReadStream(fullPathToFile);
  const writableStream = fs.createWriteStream(fullPathToDestination);

  const brotliDecompression = zlib.createBrotliDecompress();

  // TODO try/catch, error = operationFailedException
  readableStream
    .pipe(brotliDecompression)
    .pipe(writableStream)
    .on("finish", () => {
      console.log("File successfully decompressed.");
    });
};

export { compress, decompress };
