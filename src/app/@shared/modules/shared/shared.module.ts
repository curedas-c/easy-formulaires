import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdviseComponent } from '../../components/advise/advise.component';
import { ComponentInjectorService } from '../../../@core/services/component-injector.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AdviseComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  exports: [AdviseComponent],
  providers: [ComponentInjectorService]
})
export class SharedModule { }
