import fs from "fs";
import path from "path";

const ls = (currentDir) => {
  return fs.readdirSync(currentDir).map((file, index) => {
    const isDirectory = path.extname(file);
    return {
      index: index,
      Name: file,
      Type: isDirectory.length > 0 ? "file" : "directory",
    };
  });
};

export { ls };
