import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormListPageRoutingModule } from './form-list-routing.module';

import { FormListPage } from './form-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { NbCardModule } from '@nebular/theme';

import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormListPageRoutingModule,
    TranslateModule.forChild(),
    NbCardModule,
    MatMenuModule
  ],
  declarations: [FormListPage]
})
export class FormListPageModule {}
