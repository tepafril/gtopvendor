import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDevicePage } from './list-device.page';

const routes: Routes = [
  {
    path: '',
    component: ListDevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDevicePageRoutingModule {}
