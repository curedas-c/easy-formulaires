import { Component } from '@angular/core';
import { LanguageService } from './@core/services/language.service';
import { version } from '../../package.json';
import { FormStateService } from './@core/services/form-state.service';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public version: string = version;
  public toggleChecked = false;

  constructor(
    private language: LanguageService,
    private formState: FormStateService,
    private location: Location
  ) {
    App.addListener('backButton', () => {
      if (this.location.isCurrentPathEqualTo('/form-list')) {
        App.exitApp();
      } else if (this.location.isCurrentPathEqualTo('/form-view/table')) {
        this.location.back();
      }
    });

    // translation initialisation
    this.language.initLanguage().then((langCode) => {
      if (langCode === 'fr') {
        this.toggleChecked = true;
      }
    });

    this.formState.initState();
  }

  switch($event: any) {
    const languageCode = $event.detail.checked ? 'fr' : 'en';
    this.language.setLanguageTo(languageCode);
  }
}
