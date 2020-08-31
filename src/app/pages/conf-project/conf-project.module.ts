import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfProjectPageRoutingModule } from './conf-project-routing.module';

import { ConfProjectPage } from './conf-project.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConfProjectPageRoutingModule
  ],
  declarations: [ConfProjectPage]
})
export class ConfProjectPageModule {}
