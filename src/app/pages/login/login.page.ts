import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { LoadingService } from '../../services/loading.service';
import { AuthService }    from '../../services/auth.service';
import { AlertService }   from '../../services/alert.service';
// import { OneSignal } from '@ionic-native/onesignal/ngx';

// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  phoneNumber;
  httpResponse;

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private loadingController: LoadingController,
    // private oneSignal: OneSignal,
    // public firebaseAuthentication: FirebaseAuthentication,
    private toastController: ToastController,
    private loadingService: LoadingService
  ) {
    
  }

  ngOnInit() {
  }

  dismissLogin() {
    this.modalController.dismiss();
  }

  login(form: NgForm) {
    this.loadingService.present();
    this.phoneNumber = form.value.phone;
    this.authService.verifyPhone(this.phoneNumber).subscribe( data => {
      this.httpResponse = data;
      this.phoneNumber = this.httpResponse.phone;
      this.authService.login(this.phoneNumber, form.value.password).subscribe(
        data => {
          this.httpResponse = data;
        },
        err => {
          if( err.error.message ){
            this.alertService.presentToast("<ion-text>" + err.error.message + "</ion-text>","danger");
          }
          else{
            this.alertService.presentToast("<ion-text>" + err.message + "</ion-text>","danger");
          }
          this.loadingService.dismiss();
        },
        () => {
          this.alertService.presentToast("<ion-text>" + this.httpResponse.message + "</ion-text>","success");
          
          this.loadingService.dismiss();
          this.dismissLogin();

          // console.log("USERID: "+this.authService.user.id);

          // if (this.platform.is('cordova')) {
          //   this.oneSignal.setExternalUserId(this.authService.user.id);
          // }
          if(this.authService.isLoggedIn) {
            this.navCtrl.navigateRoot('list-device');
          }
        }
      );
    }, err => {
      console.log(err);
      if( err.error.message ){
        this.alertService.presentToast("<ion-text>" + err.error.message + "</ion-text>","danger");
      }
      else{
        this.alertService.presentToast("<ion-text>" + err.message + "</ion-text>","danger");
      }
      this.loadingService.dismiss();
    });
  }



}
