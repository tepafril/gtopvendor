import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { PickerController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";
import { ActivatedRoute } from '@angular/router';

import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.page.html',
  styleUrls: ['./create-staff.page.scss'],
})
export class CreateStaffPage implements OnInit {

  httpResponse;

  constructor(
    private pickerController: PickerController,
    private navCtrl: NavController,
    private alertService: AlertService,
    private httpService: HttpService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
  }

  name;
  phone;
  gender;
  dob;
  email;

  create()
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
      name                  : this.name,
      phone                 : this.phone,
      gender                : this.gender,
      dob                   : this.dob,
      email                 : this.email,
    };
    this.loadingService.present();
    this.httpService.createStaff(params).subscribe(res => {
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
      this.navCtrl.navigateBack('list-repairer');
    });
  }

  goBack(){
    this.navCtrl.navigateBack('list-repairer');
  }

}
