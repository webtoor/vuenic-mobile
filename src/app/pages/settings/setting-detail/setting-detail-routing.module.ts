import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingDetailPage } from './setting-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SettingDetailPage
  },
  {
    path: 'setting-user-info',
    loadChildren: () => import('./setting-user-info/setting-user-info.module').then( m => m.SettingUserInfoPageModule)
  },
  {
    path: 'setting-address',
    loadChildren: () => import('./setting-address/setting-address.module').then( m => m.SettingAddressPageModule)
  },
  {
    path: 'setting-password',
    loadChildren: () => import('./setting-password/setting-password.module').then( m => m.SettingPasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingDetailPageRoutingModule {}
