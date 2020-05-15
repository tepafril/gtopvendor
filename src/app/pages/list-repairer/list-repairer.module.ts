import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRepairerPageRoutingModule } from './list-repairer-routing.module';

import { ListRepairerPage } from './list-repairer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRepairerPageRoutingModule
  ],
  declarations: [ListRepairerPage]
})
export class ListRepairerPageModule {}
