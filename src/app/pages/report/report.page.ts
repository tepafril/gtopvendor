import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(
    private navCtrl: NavController, 
    private alertService: AlertService,
    private httpService: HttpService,
    private barcodeScanner: BarcodeScanner,
    private loadingService: LoadingService,
    private menuController: MenuController,
    private authService:    AuthService,
  ) { }

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

}
