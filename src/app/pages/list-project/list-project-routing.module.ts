import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProjectPage } from './list-project.page';

const routes: Routes = [
  {
    path: '',
    component: ListProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProjectPageRoutingModule {}
