import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterRepairerPageRoutingModule } from './register-repairer-routing.module';

import { RegisterRepairerPage } from './register-repairer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterRepairerPageRoutingModule
  ],
  declarations: [RegisterRepairerPage]
})
export class RegisterRepairerPageModule {}
