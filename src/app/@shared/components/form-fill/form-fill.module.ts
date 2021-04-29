import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFillComponent } from './form-fill.component';
import { NbCardModule, NbCheckboxModule, NbButtonModule } from '@nebular/theme';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormFillComponent],
  imports: [
    CommonModule,
    IonicModule,
    NbCardModule,
    NbCheckboxModule,
    NbButtonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  exports: [FormFillComponent],
})
export class FormFillModule {}
