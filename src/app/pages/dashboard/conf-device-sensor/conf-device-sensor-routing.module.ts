import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfDeviceSensorPage } from './conf-device-sensor.page';

const routes: Routes = [
  {
    path: '',
    component: ConfDeviceSensorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfDeviceSensorPageRoutingModule {}
