import { Injectable } from '@angular/core';
import {
  AdMob,
  BannerAdOptions,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents,
} from '@capacitor-community/admob';

const APP_ID = 'ca-app-pub-2091650802043349~4969241489';

@Injectable({
  providedIn: 'root',
})
export class AdmobService {
  constructor() {}

  async initialize(): Promise<void> {
    AdMob.initialize({
      // initializeForTesting: true,
    });
  }

  async showBanner(): Promise<void> {
    const BANNER_AD = 'ca-app-pub-2091650802043349/9798610926';
    const ADAPTIVE_BANNER = 'ca-app-pub-2091650802043349/9193241738';
    const TEST_BANNER_AD = 'ca-app-pub-3940256099942544/6300978111';

    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      // Subscribe Banner Event Listener
    });

    const options: BannerAdOptions = {
      adId: BANNER_AD,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      // isTesting: true
      // npa: true
    };
    AdMob.showBanner(options);
  }

  async hideBanner(): Promise<void> {
    AdMob.hideBanner();
  }

  async resumeBanner(): Promise<void> {
    AdMob.resumeBanner();
  }
}
