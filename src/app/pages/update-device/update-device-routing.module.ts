import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDevicePage } from './update-device.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateDevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateDevicePageRoutingModule {}
