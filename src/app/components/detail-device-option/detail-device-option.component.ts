import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, NavParams }  from "@ionic/angular";

import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-detail-device-option',
  templateUrl: './detail-device-option.component.html',
  styleUrls: ['./detail-device-option.component.scss'],
})
export class DetailDeviceOptionComponent implements OnInit {

  item_id;

  constructor(
    public navParams:NavParams,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public loadingService: LoadingService,
    public alertService: AlertService,
    public httpService: HttpService,
    public router: Router,
  ) {
    this.item_id = this.navParams.get('item_id');
    console.log(this.item_id);
  }

  ngOnInit() {}

  block(){
    this.popoverController.dismiss('list-device');
  }

  edit(){
    this.popoverController.dismiss('update-device');
  }

  async resetPassword()
  {
    this.router.navigateByUrl("reset-password/"+this.item_id);
    await this.popoverController.dismiss();
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete!',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.loadingService.present();
            this.httpService.deleteDevice(this.item_id).subscribe(res => {
            }, err => {
              if( err.error.message ){
                this.alertService.presentToast( err.error.message ,"danger");
              }
              else{
                this.alertService.presentToast( err.message ,"danger");
              }
              this.loadingService.dismiss();
            }, ()=>{
              this.alertService.presentToast( "Device has been deleted." ,"success");
              this.loadingService.dismiss();
              this.popoverController.dismiss('list-device');
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
