import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingUserInfoPage } from './setting-user-info.page';

const routes: Routes = [
  {
    path: '',
    component: SettingUserInfoPage
  },
  {
    path: 'edit-user-info',
    loadChildren: () => import('./edit-user-info/edit-user-info.module').then( m => m.EditUserInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingUserInfoPageRoutingModule {}
