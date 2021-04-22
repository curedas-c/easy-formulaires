import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormViewPageRoutingModule } from './form-view-routing.module';

import { FormViewPage } from './form-view.page';
import { FormShowComponent } from './form-show/form-show.component';
import { FormTableComponent } from './form-table/form-table.component';
import { FormFillModule } from '../@shared/components/form-fill/form-fill.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormViewPageRoutingModule,
    TranslateModule.forChild(),
    FormFillModule,
    MatMenuModule,
  ],
  declarations: [FormViewPage, FormShowComponent, FormTableComponent],
})
export class FormViewPageModule {}
