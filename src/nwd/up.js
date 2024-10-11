import path from "path";
import os from "os";

const up = (currentDir) => {
  const directories = currentDir.split(path.delimiter);

  if (directories.length > 2) {
    return path.join(currentDir, "../");
  } else {
    return currentDir;
  }
};

export { up };
