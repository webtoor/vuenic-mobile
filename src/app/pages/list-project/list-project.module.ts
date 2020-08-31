import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProjectPageRoutingModule } from './list-project-routing.module';

import { ListProjectPage } from './list-project.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProjectPageRoutingModule
  ],
  declarations: [ListProjectPage]
})
export class ListProjectPageModule {}
