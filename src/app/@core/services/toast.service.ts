import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(public toast: ToastController) {}

  async presentToast(message: string, color: string, canDismiss: boolean = false) {
    const options: any = {
      message,
      animated: true,
      position: 'bottom',
      color,
      keyboardClose: true
    };

    if (!canDismiss) {
      options.duration = 4000;
    } else {
      options.buttons = [
        {
          text: 'OK',
          role: 'cancel'
        },
      ];
    }

    const toast = await this.toast.create(options);
    toast.present();
    return toast.onDidDismiss();
  }
}
