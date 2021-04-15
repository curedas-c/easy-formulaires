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

   initLanguage() {
     this.storage.getKeyValue('language').then(languageCode => {
      this.translate.addLangs(['en', 'fr']);
      this.translate.setDefaultLang(languageCode || 'en');
     });
   }

   setLanguageTo(languageCode: string) {
    this.translate.use(languageCode);
   }
}
