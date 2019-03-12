
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
      { enableTracing: false })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
