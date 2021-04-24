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
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NbCardModule, NbSelectModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormViewPageRoutingModule,
    TranslateModule.forChild(),
    FormFillModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NbCardModule,
    NbSelectModule,
  ],
  declarations: [FormViewPage, FormShowComponent, FormTableComponent],
})
export class FormViewPageModule {}
