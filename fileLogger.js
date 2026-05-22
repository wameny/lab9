import fs from "fs";

export class FileLogger {
  constructor(filePath) {
    this.filePath = filePath;
  }

  log(message) {
    fs.appendFileSync(this.filePath, message + "\n");
  }
}
