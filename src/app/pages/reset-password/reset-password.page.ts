import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
import { NavController } from "@ionic/angular";

=======
import { NavController, PopoverController, AlertController, NavParams }  from "@ionic/angular";
>>>>>>> 14ce31b67f88bcda2c151957b33122d387283434

import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  itemID = 0;

  new_password = ''
  confirm_new_password = '';

  httpResponse;

  constructor(
    private httpService: HttpService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) { }


  goBack(){
    this.navCtrl.navigateBack( 'detail-device/' + this.itemID );
  }

  ngOnInit() {
    this.itemID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  reset(){
    
    if( this.new_password.length < 3 || this.confirm_new_password.length < 3){
      this.alertService.presentToast( "Invalid GPS SIM!" ,"danger");
      return;
    }
    
    if( this.new_password.length != this.confirm_new_password.length ){
      this.alertService.presentToast( "Password does not match" ,"danger");
      return;
    }

    let params = {
      device_id             :   this.itemID,
      password              :   this.new_password,
      password_confirmation :   this.confirm_new_password
    };

    this.loadingService.present();
    this.httpService.resetPassword(params).subscribe(res => {
      this.httpResponse = res;
    }, err => {
      if( err.error.message ){
        this.alertService.presentToast( err.error.message ,"danger");
      }
      else{
        this.alertService.presentToast( err.message ,"danger");
      }
      this.loadingService.dismiss();
    }, ()=>{
      this.loadingService.dismiss();
      this.alertService.presentToast( this.httpResponse.message ,"success");
      this.navCtrl.navigateBack('list-device');
    });
  }

}
