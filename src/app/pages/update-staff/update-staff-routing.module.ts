import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateStaffPage } from './update-staff.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateStaffPageRoutingModule {}
