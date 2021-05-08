import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileExtension } from 'src/app/@shared/models/fileExtension.model';
import { Share } from '@capacitor/share';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private openNativeSettings: OpenNativeSettings) {}

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
    } else {
      formattedData = data;
    }

    const FILE_OPTIONS = {
      path: fileName,
      data: formattedData,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    };

    const PERMISSION_STATE = await Filesystem.checkPermissions();
    if (PERMISSION_STATE.publicStorage === 'denied') {
      await Filesystem.requestPermissions();
    }

    try {
      await this.saveWithCapacitor(FILE_OPTIONS);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async share(options: { fileName: string; data: any[]; type: FileExtension }) {
    let { fileName } = options;
    const { data, type } = options;
    const CSV_DATA = this.transformToCSV(data);
    fileName = `${fileName}.${type}`;

    const FILE_OPTIONS = {
      path: fileName,
      data: CSV_DATA,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
    };

    this.saveWithCapacitor(FILE_OPTIONS).then((file) => {
      Share.share({
        title: fileName,
        url: file.uri,
      });
    });
  }

  openAppSettings() {
    const settings = this.openNativeSettings.open('application_details');
  }

  // Utilities
  private transformToCSV(data: any): string {
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

  private async saveWithCapacitor(fileOptions: any) {
    return await Filesystem.writeFile(fileOptions);
  }
}
