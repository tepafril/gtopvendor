import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController) {

  }


  async presentToast(message: any, color = 'primary', intervalDuration = 5000) {
    const toast = await this.toastController.create({
      message: message,
      duration: intervalDuration,
      position: 'top',
      color: color
    });
    toast.present();
  }

  async presentBottomToast(message: any, color = 'primary', intervalDuration = 5000) {
    const toast = await this.toastController.create({
      message: message,
      duration: intervalDuration,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}
