import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListVendorPageRoutingModule } from './list-vendor-routing.module';

import { ListVendorPage } from './list-vendor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListVendorPageRoutingModule
  ],
  declarations: [ListVendorPage]
})
export class ListVendorPageModule {}
