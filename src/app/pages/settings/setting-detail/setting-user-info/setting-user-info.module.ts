import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingUserInfoPageRoutingModule } from './setting-user-info-routing.module';

import { SettingUserInfoPage } from './setting-user-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingUserInfoPageRoutingModule
  ],
  declarations: [SettingUserInfoPage]
})
export class SettingUserInfoPageModule {}
