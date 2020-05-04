import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListVendorPage } from './list-vendor.page';

const routes: Routes = [
  {
    path: '',
    component: ListVendorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListVendorPageRoutingModule {}
