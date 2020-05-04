import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailDevicePageRoutingModule } from './detail-device-routing.module';

import { DetailDevicePage } from './detail-device.page';

import { DetailDeviceOptionComponent } from '../../components/detail-device-option/detail-device-option.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailDevicePageRoutingModule
  ],
  declarations: [DetailDevicePage, DetailDeviceOptionComponent],
  entryComponents: [DetailDeviceOptionComponent]
})
export class DetailDevicePageModule {}
