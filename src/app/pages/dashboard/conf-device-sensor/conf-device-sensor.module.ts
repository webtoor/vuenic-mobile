import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfDeviceSensorPageRoutingModule } from './conf-device-sensor-routing.module';

import { ConfDeviceSensorPage } from './conf-device-sensor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfDeviceSensorPageRoutingModule
  ],
  declarations: [ConfDeviceSensorPage]
})
export class ConfDeviceSensorPageModule {}
