import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingAddressPage } from './setting-address.page';

const routes: Routes = [
  {
    path: '',
    component: SettingAddressPage
  },
  {
    path: 'add-address',
    loadChildren: () => import('./add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'edit-address/:user_address_id',
    loadChildren: () => import('./edit-address/edit-address.module').then( m => m.EditAddressPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingAddressPageRoutingModule {}
