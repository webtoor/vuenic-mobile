import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDeviceSensorPage } from './edit-device-sensor.page';

const routes: Routes = [
  {
    path: '',
    component: EditDeviceSensorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDeviceSensorPageRoutingModule {}
