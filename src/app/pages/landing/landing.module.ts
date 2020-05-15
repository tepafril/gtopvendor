import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import { LoginPage } from '../../pages/login/login.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    LandingPageRoutingModule
  ],
  declarations: [LandingPage, LoginPage],
  entryComponents: [LoginPage]
})
export class LandingPageModule {}
