import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { PopoverController } from '@ionic/angular';
import { HttpService } from '../../services/http.service';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { DetailDeviceOptionComponent } from '../../components/detail-device-option/detail-device-option.component';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.page.html',
  styleUrls: ['./detail-device.page.scss'],
})
export class DetailDevicePage implements OnInit {

  httpResponse;

  itemID;
  product_name;
  customer_phone;
  imei;
  gps_sim;
  plate;
  vehicle_name;
  created_at;

  sale_price;
  expired_at;

  module_geolocation    = true;
  module_history        = true;
  module_engine         = true;
  module_device         = true;
  module_ignition       = true;
  module_parking        = true;
  module_trip           = true;
  module_oil            = true;
  module_tire           = true;
  module_speed          = true;
  module_summary        = true;
  module_icon           = true;
  module_geofence       = true;
  module_polygonfence   = true;
  module_group          = true;
  module_fuel           = true;

  constructor(
    private navCtrl: NavController,
    private httpService: HttpService,
    private alertService: AlertService,
    private popoverController: PopoverController,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.itemID = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter(){
    this.initQuery();
  }

  initQuery(){
    this.loadingService.present();
    this.httpService.getDevice(this.itemID).subscribe(res => {
      this.httpResponse = res;
      this.httpResponse = JSON.parse(this.httpResponse.items);
    }, err => {
      if( err.error.message ){
        this.alertService.presentToast( err.error.message ,"danger");
      }
      else{
        this.alertService.presentToast( err.message ,"danger");
      }
      this.loadingService.dismiss();
    }, ()=>{
      this.product_name = this.httpResponse.product_name;
      this.customer_phone = this.httpResponse.owner.phone;
      this.imei = this.httpResponse.imei;
      this.gps_sim = this.httpResponse.phone;
      this.plate = this.httpResponse.plate;
      this.vehicle_name = this.httpResponse.name;
      this.created_at = this.httpResponse.created_at;
      // this.sale_price = this.httpResponse.sale_detail.unit_price;
      this.expired_at = this.httpResponse.expired_at;
      
      this.module_geolocation    = this.httpResponse.module_geolocation;
      this.module_history        = this.httpResponse.module_history;
      this.module_engine         = this.httpResponse.module_engine;
      this.module_device         = this.httpResponse.module_device;
      this.module_ignition       = this.httpResponse.module_ignition;
      this.module_parking        = this.httpResponse.module_parking;
      this.module_trip           = this.httpResponse.module_trip;
      this.module_oil            = this.httpResponse.module_oil;
      this.module_tire           = this.httpResponse.module_tire;
      this.module_speed          = this.httpResponse.module_speed;
      this.module_summary        = this.httpResponse.module_summary;
      this.module_icon           = this.httpResponse.module_icon;
      this.module_geofence       = this.httpResponse.module_geofence;
      this.module_polygonfence   = this.httpResponse.module_polygonfence;
      this.module_group          = this.httpResponse.module_group;
      this.module_fuel           = this.httpResponse.module_fuel;

      this.loadingService.dismiss();
    });
  }

  goBack(){
    this.navCtrl.navigateBack('list-device');
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DetailDeviceOptionComponent,
      event: ev,
      translucent: true,
      componentProps:{
        item_id : this.httpResponse.id
      }
    });
    popover.onDidDismiss().then(res => {
      console.log(res);
      if(res.data == 'list-device')
        this.navCtrl.navigateBack('list-device');
      else if(res.data == 'update-device')
        this.navCtrl.navigateForward('update-device/' + this.itemID);
    });
    return await popover.present();
  }

}
