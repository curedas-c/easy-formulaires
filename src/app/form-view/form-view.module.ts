import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormViewPageRoutingModule } from './form-view-routing.module';

import { FormViewPage } from './form-view.page';
import { FormShowComponent } from './form-show/form-show.component';
import { FormTableComponent } from './form-table/form-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormViewPageRoutingModule
  ],
  declarations: [FormViewPage, FormShowComponent, FormTableComponent]
})
export class FormViewPageModule {}
