import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { PopoverController } from '@ionic/angular';
import { HttpService } from '../../services/http.service';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { DetailStaffOptionComponent } from '../../components/detail-staff-option/detail-staff-option.component';

import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-detail-staff',
  templateUrl: './detail-staff.page.html',
  styleUrls: ['./detail-staff.page.scss'],
})
export class DetailStaffPage implements OnInit {

  httpResponse;

  staffID;
  name;
  phone;
  gender;
  email;
  dob;

  constructor(
    private navCtrl: NavController,
    private httpService: HttpService,
    private alertService: AlertService,
    private popoverController: PopoverController,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.staffID = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter(){
    this.initQuery();
  }

  initQuery(){
    this.loadingService.present();
    this.httpService.getStaff(this.staffID).subscribe(res => {
      this.httpResponse = res;
      this.httpResponse = JSON.parse(this.httpResponse.staffs);
    }, err => {
      if( err.error.message ){
        this.alertService.presentToast( err.error.message ,"danger");
      }
      else{
        this.alertService.presentToast( err.message ,"danger");
      }
      this.loadingService.dismiss();
    }, ()=>{
      this.name = this.httpResponse.name;
      this.phone = this.httpResponse.phone;
      this.gender = this.httpResponse.gender;
      this.dob = this.httpResponse.dob;
      this.email = this.httpResponse.email;
      this.loadingService.dismiss();
    });
  }

  goBack(){
    this.navCtrl.navigateBack('list-repairer');
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DetailStaffOptionComponent,
      event: ev,
      translucent: true,
      componentProps:{
        staff_id : this.httpResponse.id
      }
    });
    popover.onDidDismiss().then(res => {
      console.log(res);
      if(res.data == 'list-repairer')
        this.navCtrl.navigateBack('list-repairer');
      else if(res.data == 'update-staff')
        this.navCtrl.navigateForward('update-staff/' + this.staffID);
    });
    return await popover.present();
  }

}
