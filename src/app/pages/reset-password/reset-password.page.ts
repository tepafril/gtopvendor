import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, AlertController, NavParams }  from "@ionic/angular";

import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  password = '';
  password_confirmation = '';
  httpResponse;

  item_id = 0;

  constructor(
    public navParams:NavParams,
    private navCtrl: NavController,
    private alertService: AlertService,
    private httpService: HttpService,
    private loadingService: LoadingService,
    public popoverController: PopoverController,
  ) {
    this.item_id = this.navParams.get('id');
    console.log(this.item_id);
  }

  ngOnInit() {
    this.popoverController.dismiss('update-device');
  }


  reset()
  {
    if( this.password.length < 3 ){
      this.alertService.presentToast( "Password should be more than 4 length!" ,"danger");
      return;
    }
    if( this.password_confirmation.length < 3 ){
      this.alertService.presentToast( "Password should be more than 4 length!" ,"danger");
      return;
    }
    if( this.password_confirmation != this.password ){
      this.alertService.presentToast( "Password does not match!" ,"danger");
      return;
    }
    let params = {
      password                   : this.password,
      password_confirmation      : this.password_confirmation,
    };

    this.loadingService.present();
    this.httpService.resetDevicePassword(params).subscribe(res => {
      this.httpResponse = res;
      console.log(res);
    }, err => {
      if( err.error.message ){
        this.alertService.presentToast( err.error.message ,"danger");
      }
      else{
        this.alertService.presentToast( err.message ,"danger");
      }
      this.loadingService.dismiss();
    }, ()=>{
      this.alertService.presentToast( this.httpResponse.message ,"success");
      this.loadingService.dismiss();
      this.navCtrl.navigateBack('list-device');
    });
  }

}
