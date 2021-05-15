import { AfterViewInit, Component } from '@angular/core';
import { LanguageService } from './@core/services/language.service';
import { version } from '../../package.json';
import { FormStateService } from './@core/services/form-state.service';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './@core/services/toast.service';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public version: string = version;
  public toggleChecked = false;

  constructor(
    private language: LanguageService,
    private formState: FormStateService,
    private location: Location,
    private toast: ToastService,
    private translate: TranslateService
  ) {
    App.addListener('backButton', () => {
      if (this.location.isCurrentPathEqualTo('/form-list')) {
        App.exitApp();
      } else if (this.location.isCurrentPathEqualTo('/form-view/table')) {
        this.location.back();
      }
      else {
        this.toast
        .presentAlert(this.translate.instant('TOAST.CONFIRM_MESSAGE'))
        .then((button) => {
          if (button.role !== 'cancel') {
            this.location.back();
          }
        });
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

  ngAfterViewInit(): void {
    SplashScreen.hide();
  }

  switch($event: any) {
    const languageCode = $event.detail.checked ? 'fr' : 'en';
    this.language.setLanguageTo(languageCode);
  }
}
