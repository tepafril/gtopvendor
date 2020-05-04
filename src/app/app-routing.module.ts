import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-device',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'list-device',
    loadChildren: () => import('./pages/list-device/list-device.module').then( m => m.ListDevicePageModule)
  },
  {
    path: 'list-customer',
    loadChildren: () => import('./pages/list-customer/list-customer.module').then( m => m.ListCustomerPageModule)
  },
  {
    path: 'list-vendor',
    loadChildren: () => import('./pages/list-vendor/list-vendor.module').then( m => m.ListVendorPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./pages/report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'detail-device/:id',
    loadChildren: () => import('./pages/detail-device/detail-device.module').then( m => m.DetailDevicePageModule)
  },
  {
    path: 'create-device/:imei',
    loadChildren: () => import('./pages/create-device/create-device.module').then( m => m.CreateDevicePageModule)
  },
  {
    path: 'update-device',
    loadChildren: () => import('./pages/update-device/update-device.module').then( m => m.UpdateDevicePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
