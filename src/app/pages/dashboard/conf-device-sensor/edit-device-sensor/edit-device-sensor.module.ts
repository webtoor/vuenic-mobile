import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDeviceSensorPageRoutingModule } from './edit-device-sensor-routing.module';

import { EditDeviceSensorPage } from './edit-device-sensor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditDeviceSensorPageRoutingModule
  ],
  declarations: [EditDeviceSensorPage]
})
export class EditDeviceSensorPageModule {}
