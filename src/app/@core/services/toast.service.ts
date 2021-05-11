import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  haveAlert = false;
  constructor(
    public toast: ToastController,
    public alertController: AlertController,
    private translate: TranslateService
  ) {}

  async presentToast(
    message: string,
    color: string,
    canDismiss: boolean = false
  ) {
    const options: any = {
      message,
      animated: true,
      position: 'bottom',
      color,
      keyboardClose: true,
    };

    if (!canDismiss) {
      options.duration = 4000;
    } else {
      options.buttons = [
        {
          text: 'OK',
          role: 'cancel',
        },
      ];
    }

    const toast = await this.toast.create(options);
    toast.present();
    return toast.onDidDismiss();
  }

  async presentAlert(header: string, message: string = null) {
    const vm = this;
    if (!vm.haveAlert) {
      vm.haveAlert = true;
      const options: any = {
        header,
        buttons: [
          {
            text: this.translate.instant('TOAST.CONFIRM'),
            handler: () => {
              vm.haveAlert = false;
            }
          },
          {
            text: this.translate.instant('TOAST.CANCEL'),
            role: 'cancel',
            handler: () => {
              vm.haveAlert = false;
            },
          },
        ],
        animated: true,
        cssClass: 'custom-alert',
      };

      if (message) {
        options.message = message;
      }

      const alert = await this.alertController.create(options);
      await alert.present();
      return alert.onDidDismiss();
    }
  }
}
