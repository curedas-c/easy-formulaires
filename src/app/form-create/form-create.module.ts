import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCreatePageRoutingModule } from './form-create-routing.module';

import { FormCreatePage } from './form-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCreatePageRoutingModule
  ],
  declarations: [FormCreatePage]
})
export class FormCreatePageModule {}
