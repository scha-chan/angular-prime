
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioFormComponent } from 'src/app/usuario/usuario-form.component';
import { UsuarioListComponent } from 'src/app/usuario/usuario-list.component';

const routes: Routes = [
  {
    path: 'cadastrar',
    component: UsuarioFormComponent
  },
  {
    path: '',
    component: UsuarioListComponent
  },
  {
    path: 'editar/:id',
    component: UsuarioFormComponent
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
export class UsuarioRoutingModule { }
