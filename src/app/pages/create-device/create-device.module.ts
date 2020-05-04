import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDevicePageRoutingModule } from './create-device-routing.module';

import { CreateDevicePage } from './create-device.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDevicePageRoutingModule
  ],
  declarations: [CreateDevicePage]
})
export class CreateDevicePageModule {}
