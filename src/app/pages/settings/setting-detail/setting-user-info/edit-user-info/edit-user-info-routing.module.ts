import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUserInfoPage } from './edit-user-info.page';

const routes: Routes = [
  {
    path: '',
    component: EditUserInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserInfoPageRoutingModule {}
