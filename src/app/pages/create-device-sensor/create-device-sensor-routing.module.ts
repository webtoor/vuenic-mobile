import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDeviceSensorPage } from './create-device-sensor.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDeviceSensorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDeviceSensorPageRoutingModule {}
