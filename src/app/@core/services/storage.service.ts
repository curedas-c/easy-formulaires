import { Injectable } from '@angular/core';
import { Preferences  } from '@capacitor/preferences';
import {parse, stringify} from 'flatted';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setKeyValue(key: string, itemValue: any) {
    return await Preferences.set({
      key,
      value: stringify(itemValue)
    });
  }

  async getKeyValue(key: string) {
    const { value } = await Preferences.get({ key });

    return value ? parse(value) : null;
  }

  async removeKeyValue(key: string) {
    return await Preferences.remove({ key });
  }

  async clearKeys() {
    return await Preferences.clear();
  }
}
