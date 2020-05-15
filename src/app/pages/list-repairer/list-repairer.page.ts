import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-list-repairer',
  templateUrl: './list-repairer.page.html',
  styleUrls: ['./list-repairer.page.scss'],
})
export class ListRepairerPage implements OnInit {

  constructor( 
    private navCtrl: NavController, 
    private alertService: AlertService,
    private httpService: HttpService,
    private barcodeScanner: BarcodeScanner,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    
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
    this.httpService.getStaffs(this.pagination, this.query).subscribe(res => {
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
      for( let i = 0; i < this.httpResponse.length; i++ ){
        this.dataList.push(this.httpResponse[i]);
      }
      this.pagination ++;
      this.loadingService.dismiss();
    });
  }

  loadData(event) {

    this.infiniteScrollEvent = event;

    this.httpService.getStaffs(this.pagination, this.query).subscribe(res => {
      this.httpResponse = res;
      this.httpResponse = JSON.parse(this.httpResponse.staffs);
    }, err => {
      if( err.error.message ){
        this.alertService.presentToast( err.error.message ,"danger");
      }
      else{
        this.alertService.presentToast( err.message ,"danger");
      }
    }, ()=>{
      for( let i = 0; i < this.httpResponse.length; i++ ){
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

}
