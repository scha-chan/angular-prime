
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioRoutingModule } from 'src/app/usuario/usuario-routing.module';

const routes: Routes = [
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario-routing.module').then(m => m.UsuarioRoutingModule)
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
