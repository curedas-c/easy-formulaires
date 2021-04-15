import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setKeyValue(key: string, itemValue: any) {
    return await Storage.set({
      key,
      value: JSON.stringify(itemValue),
    });
  }

  async getKeyValue(key: string) {
    const { value } = await Storage.get({ key });

    return value ? JSON.parse(value) : null;
  }

  async removeKeyValue(key: string) {
    return await Storage.remove({ key });
  }

  async clearKeys() {
    return await Storage.clear();
  }
}
