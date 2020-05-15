import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateStaffPageRoutingModule } from './update-staff-routing.module';

import { UpdateStaffPage } from './update-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateStaffPageRoutingModule
  ],
  declarations: [UpdateStaffPage]
})
export class UpdateStaffPageModule {}
