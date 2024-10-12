import path from "path";
import fs from "fs";
import crypto from "crypto";

const calculateHash = (currentDir, pathToFile) => {
  const fullPath = path.normalize(path.join(currentDir, pathToFile));

  if (!fs.existsSync(fullPath) || path.extname(fullPath).length === 0) {
    console.log("Operation Failed");
    return;
  }

  const hash = crypto.createHash("sha256");
  const readableStream = fs.createReadStream(fullPath);

  readableStream.pipe(hash).on("finish", () => {
    console.log(`SHA 256 of a file: ${hash.digest()}`);
  });
};

export { calculateHash };
