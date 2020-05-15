import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailStaffPage } from './detail-staff.page';

const routes: Routes = [
  {
    path: '',
    component: DetailStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailStaffPageRoutingModule {}
