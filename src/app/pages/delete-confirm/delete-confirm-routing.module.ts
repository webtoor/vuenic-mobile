import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteConfirmPage } from './delete-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteConfirmPageRoutingModule {}
