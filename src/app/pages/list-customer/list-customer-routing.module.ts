import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCustomerPage } from './list-customer.page';

const routes: Routes = [
  {
    path: '',
    component: ListCustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCustomerPageRoutingModule {}
