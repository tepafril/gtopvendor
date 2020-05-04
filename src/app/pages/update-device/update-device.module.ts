import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDevicePageRoutingModule } from './update-device-routing.module';

import { UpdateDevicePage } from './update-device.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateDevicePageRoutingModule
  ],
  declarations: [UpdateDevicePage]
})
export class UpdateDevicePageModule {}
