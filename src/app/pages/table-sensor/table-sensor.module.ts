import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableSensorPageRoutingModule } from './table-sensor-routing.module';

import { TableSensorPage } from './table-sensor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableSensorPageRoutingModule
  ],
  declarations: [TableSensorPage]
})
export class TableSensorPageModule {}
