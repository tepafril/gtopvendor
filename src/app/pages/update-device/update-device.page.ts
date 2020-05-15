import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { PickerController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";
import { ActivatedRoute } from '@angular/router';

import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.page.html',
  styleUrls: ['./update-device.page.scss'],
})
export class UpdateDevicePage implements OnInit {

  itemID = 0;

  customer_phone = '';
  imei = '';
  gps_sim = '';
  plate = '';
  vehicle_name = '';
  product_id = 0;
  product_name = 'Select Product';
  expiration_val = "0";
  expiration_name = 'Select Expiration';
  shop_id = 1;
  sale_price = '0';
  created_at;
  expired_at;

  products: string[] = ["Tiger", "Lion", "Elephant", "Fox", "Wolf"];
  expirationOption = [];
  productOption = [];

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
    this.itemID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    
    // this.loadingService.present();
    this.sale_price = Number(this.sale_price).toFixed(2);
    this.expirationOption = [
      { text: "1 Year", value: "365" },
      { text: "1 Week", value: "7" },
      { text: "1 Month", value: "30" },
      { text: "3 Months", value: "90" },
      { text: "6 Months", value: "180" },
      { text: "2 Years", value: "730" },
      { text: "3 Years", value: "1095" },
      { text: "5 Years", value: "1825" },
    ];
    this.expiration_val = "365";
    this.expiration_name = '1 Year';
  }

  ionViewWillEnter(){
    this.initQuery();
    this.initProductQuery();
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
      this.product_id = this.httpResponse.product_id;
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



  update()
  {
    if( this.product_id <= 0 ){
      this.alertService.presentToast( "Please select product!" ,"danger");
      return;
    }
    if( this.customer_phone.length < 8 ){
      this.alertService.presentToast( "Invalid customer's phone!" ,"danger");
      return;
    }
    if( this.imei.length < 7 ){
      this.alertService.presentToast( "Invalid GPS-ACC-ID!" ,"danger");
      return;
    }
    if( this.gps_sim.length < 8 ){
      this.alertService.presentToast( "Invalid GPS SIM!" ,"danger");
      return;
    }
    if( this.vehicle_name.length < 2 ){
      this.alertService.presentToast( "Invalid vehicle name!" ,"danger");
      return;
    }
    let params = {
      item_id             : this.itemID,
      customer_phone      : this.customer_phone,
      imei                : this.imei,
      gps_sim             : this.gps_sim,
      plate               : this.plate,
      vehicle_name        : this.vehicle_name,
      expiration          : this.expiration_val,
      product_id          : this.product_id,
      shop_id             : this.shop_id,
      sale_price          : this.sale_price,
      module_geolocation  : this.module_geolocation,
      module_history      : this.module_history,
      module_engine       : this.module_engine,
      module_device       : this.module_device,
      module_ignition     : this.module_ignition,
      module_parking      : this.module_parking,
      module_trip         : this.module_trip,
      module_oil          : this.module_oil,
      module_tire         : this.module_tire,
      module_speed        : this.module_speed,
      module_summary      : this.module_summary,
      module_icon         : this.module_icon,
      module_geofence     : this.module_geofence,
      module_polygonfence : this.module_polygonfence,
      module_group        : this.module_group,
      module_fuel         : this.module_fuel,
    };
    this.loadingService.present();
    this.httpService.updateDevice(params).subscribe(res => {
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
      this.loadingService.dismiss();
      this.navCtrl.navigateBack('list-device');
    });
  }


  goBack(){
    this.navCtrl.navigateBack( 'detail-device/' + this.itemID );
  }

  initProductQuery()
  {
    this.httpService.getProducts().subscribe(res => {
      this.httpResponse = res;
      this.httpResponse = JSON.parse(this.httpResponse.products);
    }, err => {
      if( err.error.message ){
        this.alertService.presentToast( err.error.message ,"danger");
      }
      else{
        this.alertService.presentToast( err.message ,"danger");
      }
    }, ()=>{
      for( let i=0; i < this.httpResponse.length; i++ )
      {
        this.productOption.push(
          {
            text: this.httpResponse[i].name,
            value: this.httpResponse[i].id,
          }
        );
      }
      this.loadingService.dismiss();
    });
  }

  ionPickerHandler:any;
  async showPicker(optionType) {
    let optionParam = [];
    if(optionType == 'products')
      optionParam = this.productOption;
    else if(optionType == 'expiration')
      optionParam = this.expirationOption;

    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          handler:(value:any) => {
            this.ionPickerHandler = 'cancel';
          }
        },
        {
          text:'Done',
          handler:(value:any) => {
            this.ionPickerHandler = 'done';
          }
        }
      ],
      columns:[{
        name:'Products',
        options: optionParam
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present();
    picker.onDidDismiss().then(async data => {
      if( this.ionPickerHandler == 'cancel' )
      {
        return;
      }
      
      let col = await picker.getColumn('Products');

      if(optionType == 'products')
      {
        this.product_id = col.options[col.selectedIndex].value;
        this.product_name = col.options[col.selectedIndex].text;
        for( let i=0; i < this.httpResponse.length; i++ )
        {
          if( this.httpResponse[i].id == this.product_id )
          {
            this.sale_price = Number(this.httpResponse[i].price).toFixed(2);
          }
        }
      }
      else if(optionType == 'expiration')
      {
        this.expiration_val = col.options[col.selectedIndex].value;
        this.expiration_name = col.options[col.selectedIndex].text;
      }
    });

  }

}
