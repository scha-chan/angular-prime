
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { ListComponent } from './list.component';

const routes: Routes = [
  {
    path: 'cadastrar',
    component: FormComponent
  },
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'editar/:id',
    component: FormComponent
  },  
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { enableTracing: true })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/