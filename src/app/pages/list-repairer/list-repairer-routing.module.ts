import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRepairerPage } from './list-repairer.page';

const routes: Routes = [
  {
    path: '',
    component: ListRepairerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRepairerPageRoutingModule {}
