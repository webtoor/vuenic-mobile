import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableSensorPage } from './table-sensor.page';

const routes: Routes = [
  {
    path: '',
    component: TableSensorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableSensorPageRoutingModule {}
