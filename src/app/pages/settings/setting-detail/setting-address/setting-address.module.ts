import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingAddressPageRoutingModule } from './setting-address-routing.module';

import { SettingAddressPage } from './setting-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingAddressPageRoutingModule
  ],
  declarations: [SettingAddressPage]
})
export class SettingAddressPageModule {}
