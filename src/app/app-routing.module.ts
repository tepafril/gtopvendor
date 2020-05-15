import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'list-device',
    loadChildren: () => import('./pages/list-device/list-device.module').then( m => m.ListDevicePageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'list-customer',
    loadChildren: () => import('./pages/list-customer/list-customer.module').then( m => m.ListCustomerPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'list-vendor',
    loadChildren: () => import('./pages/list-vendor/list-vendor.module').then( m => m.ListVendorPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'report',
    loadChildren: () => import('./pages/report/report.module').then( m => m.ReportPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-device/:id',
    loadChildren: () => import('./pages/detail-device/detail-device.module').then( m => m.DetailDevicePageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'create-device/:imei',
    loadChildren: () => import('./pages/create-device/create-device.module').then( m => m.CreateDevicePageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'update-device/:id',
    loadChildren: () => import('./pages/update-device/update-device.module').then( m => m.UpdateDevicePageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register-repairer',
    loadChildren: () => import('./pages/register-repairer/register-repairer.module').then( m => m.RegisterRepairerPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'list-repairer',
    loadChildren: () => import('./pages/list-repairer/list-repairer.module').then( m => m.ListRepairerPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'create-staff',
    loadChildren: () => import('./pages/create-staff/create-staff.module').then( m => m.CreateStaffPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-staff/:id',
    loadChildren: () => import('./pages/detail-staff/detail-staff.module').then( m => m.DetailStaffPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'update-staff/:id',
    loadChildren: () => import('./pages/update-staff/update-staff.module').then( m => m.UpdateStaffPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule), 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
