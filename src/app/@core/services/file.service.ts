import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileExtension } from 'src/app/@shared/models/fileExtension.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  async saveOnStorage(options: {
    fileName: string;
    data: any[];
    type: FileExtension;
  }) {
    let { fileName } = options;
    const { data, type } = options;

    fileName = `${fileName}.${type}`;
    let formattedData;

    if (type === 'CSV') {
      formattedData = this.transformToCSV(data);
    }
    else {
      formattedData = data;
    }

    const FILE_OPTIONS = {
      path: fileName,
      data: formattedData,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    };

    let isFileSaved = true;
    await this.getPermission().then(permission => {
      if (permission) {
        this.saveWithCapacitor(FILE_OPTIONS);
      }
      else {
        isFileSaved = false;
      }
    });

    return Promise.resolve(isFileSaved);
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

  async saveWithCapacitor(fileOptions: any) {
    await Filesystem.writeFile(fileOptions);
  }

  async getPermission() {
    const PERMISSION_STATE = await Filesystem.checkPermissions();
    if (PERMISSION_STATE.publicStorage === 'denied') {
      return this.requestPermission();
    }
    else {
      return Promise.resolve(true);
    }
  }

  async requestPermission() {
    const PERMISSION_STATE = await Filesystem.requestPermissions();
    const HAVE_PERMISSION = PERMISSION_STATE.publicStorage !== 'denied';
    return Promise.resolve(HAVE_PERMISSION);
  }
}
