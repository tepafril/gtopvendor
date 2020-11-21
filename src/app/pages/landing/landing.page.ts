import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController, LoadingController, PopoverController } from '@ionic/angular';
import { LoginPage } from '../../pages/login/login.page';
import { ENV } from '../../../environments/environment';

import { AuthService } from '../../services/auth.service';

import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  httpResponse;

  constructor(
    private modalController: ModalController,
    private menuController: MenuController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private popoverController: PopoverController,
    private loadingController: LoadingController,
    private loadingService: LoadingService
  ) { }

  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if( this.authService.isLoggedIn )
      {
        this.loadingService.present();
        this.authService.checkPassport().subscribe( res => {
          this.httpResponse = res;
        }, err => {
          this.authService.clearToken();
          this.loadingService.dismiss();
        }, () =>{
          this.loadingService.dismiss();
          this.navCtrl.navigateRoot('list-device');
        });
      }
    });
  }

  ngOnInit() {
    // this.menuController.enable(false);
    this.menuController.enable(false,"owners");
    this.menuController.enable(false,"staffs");
  }

  async login() {
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

}
