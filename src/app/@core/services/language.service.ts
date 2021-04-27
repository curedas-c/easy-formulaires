import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject$ = new BehaviorSubject<string>('en');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public currentLanguage$ = this.languageSubject$.asObservable();

  constructor(private translate: TranslateService, private storage: StorageService) {
   }

   async initLanguage(): Promise<string> {
     await this.storage.getKeyValue('language').then(languageCode => {
      this.translate.addLangs(['en', 'fr']);
      this.translate.setDefaultLang(languageCode || 'en');
      this.translate.use(languageCode || 'en');
     },
     error => {
      this.translate.setDefaultLang('en');
       this.translate.use('en');
     });

     return this.translate.currentLang;
   }

   setLanguageTo(languageCode: string) {
    this.storage.setKeyValue('language', languageCode).then(() => {
      this.translate.use(languageCode);
    });
   }
}
