import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form-list',
    pathMatch: 'full'
  },
  {
    path: 'form-list',
    loadChildren: () => import('./form-list/form-list.module').then( m => m.FormListPageModule)
  },
  {
    path: 'form-create',
    loadChildren: () => import('./form-create/form-create.module').then( m => m.FormCreatePageModule)
  },
  {
    path: 'form-view',
    loadChildren: () => import('./form-view/form-view.module').then( m => m.FormViewPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
