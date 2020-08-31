import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingPasswordPage } from './setting-password.page';

const routes: Routes = [
  {
    path: '',
    component: SettingPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPasswordPageRoutingModule {}
