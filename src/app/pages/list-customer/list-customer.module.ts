import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCustomerPageRoutingModule } from './list-customer-routing.module';

import { ListCustomerPage } from './list-customer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCustomerPageRoutingModule
  ],
  declarations: [ListCustomerPage]
})
export class ListCustomerPageModule {}
