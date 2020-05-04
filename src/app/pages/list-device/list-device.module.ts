import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDevicePageRoutingModule } from './list-device-routing.module';

import { ListDevicePage } from './list-device.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDevicePageRoutingModule
  ],
  declarations: [ListDevicePage]
})
export class ListDevicePageModule {}
