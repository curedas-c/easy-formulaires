import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCreatePageRoutingModule } from './form-create-routing.module';

import { FormCreatePage } from './form-create.page';
import {
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbTabsetModule,
  NbCardModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { FormFillModule } from '../@shared/components/form-fill/form-fill.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCreatePageRoutingModule,
    TranslateModule.forChild(),
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbCardModule,
    FormFillModule,
    MatMenuModule
  ],
  declarations: [FormCreatePage],
})
export class FormCreatePageModule {}
