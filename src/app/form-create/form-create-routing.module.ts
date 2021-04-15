import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCreatePage } from './form-create.page';

const routes: Routes = [
  {
    path: '',
    component: FormCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCreatePageRoutingModule {}
