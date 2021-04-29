import { Component } from '@angular/core';
import { LanguageService } from './@core/services/language.service';
import { version } from '../../package.json';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public version: string = version;
  public toggleChecked = false;

  constructor(private language: LanguageService) {
    this.language.initLanguage().then((langCode) => {
      if (langCode === 'fr') {
        this.toggleChecked = true;
      }
    });
  }

  switch($event: any) {
    const languageCode = $event.detail.checked ? 'fr' : 'en';
    this.language.setLanguageTo(languageCode);
  }
}
