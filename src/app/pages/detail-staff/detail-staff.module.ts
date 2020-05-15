import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailStaffPageRoutingModule } from './detail-staff-routing.module';

import { DetailStaffOptionComponent } from '../../components/detail-staff-option/detail-staff-option.component';

import { DetailStaffPage } from './detail-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailStaffPageRoutingModule
  ],
  declarations: [DetailStaffPage, DetailStaffOptionComponent],
  entryComponents: [DetailStaffOptionComponent]
})
export class DetailStaffPageModule {}
