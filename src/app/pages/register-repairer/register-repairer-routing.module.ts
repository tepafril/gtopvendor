import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterRepairerPage } from './register-repairer.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterRepairerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRepairerPageRoutingModule {}
