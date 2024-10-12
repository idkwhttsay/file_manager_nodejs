import fs from "fs";
import path from "path";

const HOME = process.env.HOME;

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

const up = (currentDir) => {
  const newDir = path.join(currentDir, "../");

  if (newDir.startsWith(HOME)) {
    return newDir;
  } else {
    console.log("Operation failed");
    return currentDir;
  }
};

const cd = (currentDir, pathToDirectory) => {
  pathToDirectory = path.normalize(path.join(currentDir, pathToDirectory));
  if (!fs.existsSync(pathToDirectory)) {
    console.log("Operation failed");
    return null;
  }

  if (
    pathToDirectory.startsWith(HOME) &&
    path.extname(pathToDirectory).length === 0
  ) {
    return pathToDirectory;
  } else {
    console.log("Operation failed");
    return currentDir;
  }
};

export { ls, up, cd };
