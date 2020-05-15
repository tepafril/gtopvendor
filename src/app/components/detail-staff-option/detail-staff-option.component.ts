import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, NavParams }  from "@ionic/angular";

import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-detail-staff-option',
  templateUrl: './detail-staff-option.component.html',
  styleUrls: ['./detail-staff-option.component.scss'],
})
export class DetailStaffOptionComponent implements OnInit {

  staffID;

  constructor(
    public navParams:NavParams,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public loadingService: LoadingService,
    public alertService: AlertService,
    public httpService: HttpService,
  ) {
    this.staffID = this.navParams.get('staff_id');
    console.log(this.staffID);
  }

  ngOnInit() {}

  edit(){
    this.popoverController.dismiss('update-staff');
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Confirm Remove!',
      message: 'Are you sure you want to remove this staff from the role?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Remove',
          cssClass: 'danger',
          handler: () => {
            this.loadingService.present();
            this.httpService.removeStaffRole(this.staffID).subscribe(res => {
            }, err => {
              if( err.error.message ){
                this.alertService.presentToast( err.error.message ,"danger");
              }
              else{
                this.alertService.presentToast( err.message ,"danger");
              }
              this.loadingService.dismiss();
            }, ()=>{
              this.alertService.presentToast( "Staff has been unassigned." ,"success");
              this.loadingService.dismiss();
              this.popoverController.dismiss('list-repairer');
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
