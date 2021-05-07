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
    const FORMATTED_DATA = this.transformToCSV(data);

    const FILE_OPTIONS = {
      path: fileName,
      data: FORMATTED_DATA,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    };

    await this.getPermission().then(permission => {
      if (permission) {
        this.saveWithCapacitor(FILE_OPTIONS);
      }
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
