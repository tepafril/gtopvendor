import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { PickerController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";
import { ActivatedRoute } from '@angular/router';

import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.page.html',
  styleUrls: ['./update-staff.page.scss'],
})
export class UpdateStaffPage implements OnInit {

  staffID;

  name;
  phone;
  gender;
  email;
  dob;

  httpResponse;

  constructor(
    private pickerController: PickerController,
    private navCtrl: NavController,
    private alertService: AlertService,
    private httpService: HttpService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
  ) { }


  goBack(){
    this.navCtrl.navigateBack( 'detail-staff/' + this.staffID );
  }

  ngOnInit() {
    this.staffID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
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

  update()
  {
    if( this.phone.length < 8 ){
      this.alertService.presentToast( "Invalid staff's phone!" ,"danger");
      return;
    }
    if( this.gender.length < 1 ){
      this.alertService.presentToast( "Gender field is required!" ,"danger");
      return;
    }
    if( this.name.length < 4 ){
      this.alertService.presentToast( "Invalid staff's name!" ,"danger");
      return;
    }
    let params = {
      staff_id              : this.staffID,
      name                  : this.name,
      phone                 : this.phone,
      gender                : this.gender,
      dob                   : this.dob,
      email                 : this.email,
    };
    this.loadingService.present();
    this.httpService.updateStaff(params).subscribe(res => {
      this.httpResponse = res;
      this.httpResponse = JSON.parse(this.httpResponse.staff);
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
      this.navCtrl.navigateBack('list-repairer');
    });
  }
}
