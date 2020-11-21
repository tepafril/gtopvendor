import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

import { NavController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public ownerMenu = [
    {
      title: 'Devices',
      url: 'list-device',
      icon: 'location'
    },
    {
      title: 'Staffs',
      url: 'list-repairer',
      icon: 'build'
    },
    // {
    //   title: 'Customers',
    //   url: 'list-customer',
    //   icon: 'people'
    // },
    {
      title: 'Vendors',
      url: 'list-vendor',
      icon: 'person'
    },
    {
      title: 'Reports',
      url: 'report',
      icon: 'reader'
    },
    {
      title: 'Logout',
      icon: 'log-out',
      url:  'logout'
    }
  ];

  public staffMenu = [
    {
      title: 'Devices',
      url: 'list-device',
      icon: 'location'
    },
    {
      title: 'Reports',
      url: 'report',
      icon: 'reader'
    },
    {
      title: 'Logout',
      icon: 'log-out',
      url:  'logout'
    }
  ];

  httpResponse;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private alertService: AlertService,
    private navController: NavController,
    private menuController: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        this.httpResponse = data;
      }, err => {
        if( err.error.message ){
          this.alertService.presentToast( err.error.message ,"danger");
        }
        else{
          this.alertService.presentToast( err.message ,"danger");
        }
      }, () => {
        this.alertService.presentToast( this.httpResponse.message ,"danger");
        this.navController.navigateRoot('landing');
      }
    );
  }
}
