import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-list-device',
  templateUrl: './list-device.page.html',
  styleUrls: ['./list-device.page.scss'],
})
export class ListDevicePage implements OnInit {

  constructor( 
    private navCtrl: NavController, 
    private alertService: AlertService,
    private httpService: HttpService,
    private barcodeScanner: BarcodeScanner,
    private loadingService: LoadingService,
    private menuController: MenuController
  ) {
  }

  ngOnInit() {
    this.menuController.enable(true);
  }

  ionViewDidEnter(){
    this.initIgnitionQuery();
  }

  ionViewDidLeave(){
    this.dataList = [];
  }

  httpResponse;
  dataList:any = [];
  pagination = 1;
  dateTemp:any = 0;
  query = '';
  infiniteScrollEvent = null;

  initIgnitionQuery()
  {
    this.loadingService.present();
    if(this.infiniteScrollEvent != null)
      this.infiniteScrollEvent.target.disabled = false;
    this.dataList = [];
    this.pagination = 1;
    this.dateTemp = '';
    this.httpService.getDevices(this.pagination, this.query).subscribe(res => {
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
      for( let i = 0; i < this.httpResponse.length; i++ ){
        if( this.httpResponse[i].owner == null ){
          this.httpResponse[i].phone = 'N/A';
        }
        else{
          this.httpResponse[i].phone = this.httpResponse[i].owner.phone;
        }
        this.dataList.push(this.httpResponse[i]);
      }
      this.pagination ++;
      this.loadingService.dismiss();
    });
  }

  loadData(event) {

    this.infiniteScrollEvent = event;

    this.httpService.getDevices(this.pagination, this.query).subscribe(res => {
      this.httpResponse = res;
      this.httpResponse = JSON.parse(this.httpResponse.items);
    }, err => {
      if( err.error.message ){
        this.alertService.presentToast( err.error.message ,"danger");
      }
      else{
        this.alertService.presentToast( err.message ,"danger");
      }
    }, ()=>{
      for( let i = 0; i < this.httpResponse.length; i++ ){
        if( this.httpResponse[i].owner == null ){
          this.httpResponse[i].phone = 'N/A';
        }
        else{
          this.httpResponse[i].phone = this.httpResponse[i].owner.phone;
        }
        this.dataList.push(this.httpResponse[i]);
      }
      this.pagination++;
      event.target.complete();

      if (this.httpResponse.length < 40) {
        event.target.disabled = true;
      }
    });
  }

  onChange(){
    this.initIgnitionQuery();
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      // console.log('Barcode data', barcodeData);
      // alert(barcodeData.text);
      if( barcodeData.text != '' )
        this.navCtrl.navigateForward('create-device/'+barcodeData.text);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
