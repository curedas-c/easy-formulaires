import { Component } from '@angular/core';
import { LanguageService } from './@core/services/language.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/form-list', icon: 'mail' },
    { title: 'Create', url: '/form-create', icon: 'paper-plane' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private language: LanguageService) {
    this.language.initLanguage();
  }

  switch($event: any) {
    const languageCode = $event.detail.checked ? 'fr' : 'en';
    this.language.setLanguageTo(languageCode);
  }
}
