import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  async saveOnStorage(options: {fileName: string; data: any[]; type: 'CSV' | 'XLSX'}) {
    let {fileName} = options;
    const {data, type} = options;

    fileName = `${fileName}.${type}`;
    const formattedData = this.transformToCSV(data);

    await Filesystem.writeFile({
      path: fileName,
      data: formattedData,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  }

  transformToCSV(data: any): string {
    const csv = [Object.keys(data[0])].concat(data);
    return csv
      .map((row) =>
        Object.values(row)
          .map((value) =>
            typeof value === 'string' ? JSON.stringify(value) : value
          )
          .toString()
      )
      .join('\n');
  }
}
