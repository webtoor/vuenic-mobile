import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfDeviceSensorPage } from './conf-device-sensor.page';

const routes: Routes = [
  {
    path: '',
    component: ConfDeviceSensorPage
  },
  {
    path: 'edit-device-sensor/:project_device_id',
    loadChildren: () => import('./edit-device-sensor/edit-device-sensor.module').then( m => m.EditDeviceSensorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfDeviceSensorPageRoutingModule {}
