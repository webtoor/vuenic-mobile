import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingDetailPageRoutingModule } from './setting-detail-routing.module';

import { SettingDetailPage } from './setting-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingDetailPageRoutingModule
  ],
  declarations: [SettingDetailPage]
})
export class SettingDetailPageModule {}
