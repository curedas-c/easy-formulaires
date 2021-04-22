import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormShowComponent } from './form-show/form-show.component';
import { FormTableComponent } from './form-table/form-table.component';

import { FormViewPage } from './form-view.page';

const routes: Routes = [
  {
    path: '',
    component: FormViewPage,
    children: [
      {
        path: 'fill',
        component: FormShowComponent,
      },
      {
        path: 'table',
        component: FormTableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormViewPageRoutingModule {}
