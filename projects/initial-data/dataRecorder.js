import fs from 'fs';
import path from 'path';

export class DataRecorder {
  constructor(fileName, columns = []) {
    this.fileName = fileName;
    this.columns = columns;
    this.#createFile();
  }

  #createFile() {
    if (!fs.existsSync(this.fileName)) {
      const dir = path.dirname(this.fileName);
      if (dir) fs.mkdirSync(dir, { recursive: true });
      const headerLine = `${this.columns.join(',')}\n`;
      fs.writeFileSync(this.fileName, headerLine, 'utf8');
    }
  }

  appendToCSV(data) {
    const csvLine = `${data.join(',')}\n`;
    fs.appendFileSync(this.fileName, csvLine, 'utf8');
  }
}
