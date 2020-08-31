import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteConfirmPageRoutingModule } from './delete-confirm-routing.module';

import { DeleteConfirmPage } from './delete-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DeleteConfirmPageRoutingModule
  ],
  declarations: [DeleteConfirmPage]
})
export class DeleteConfirmPageModule {}
