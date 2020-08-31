import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUserInfoPageRoutingModule } from './edit-user-info-routing.module';

import { EditUserInfoPage } from './edit-user-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditUserInfoPageRoutingModule
  ],
  declarations: [EditUserInfoPage]
})
export class EditUserInfoPageModule {}
