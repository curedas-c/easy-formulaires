import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private toast: ToastService) { }

  init() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        this.toast.presentAlert(notification.title, notification.subtitle);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        this.toast.presentAlert(notification.notification.title, notification.notification.subtitle).then((button) => {
          if (button.role !== 'cancel') {
            if(notification.notification.link) {
              alert(notification.notification.link);
            }
          }
        });;
      }
    );
  }
}
