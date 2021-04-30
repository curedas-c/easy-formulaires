import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import {parse, stringify} from 'flatted';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setKeyValue(key: string, itemValue: any) {
    return await Storage.set({
      key,
      value: stringify(itemValue)
    });
  }

  async getKeyValue(key: string) {
    const { value } = await Storage.get({ key });

    return value ? parse(value) : null;
  }

  async removeKeyValue(key: string) {
    return await Storage.remove({ key });
  }

  async clearKeys() {
    return await Storage.clear();
  }
}
