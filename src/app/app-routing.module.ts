import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioMusicoComponent } from './component/usuario-musico/usuario-musico.component';
import { UsuarioMusicoCreaeditaComponent } from './component/usuario-musico/usuario-musico-creaedita/usuario-musico-creaedita.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'Usuario_Musico', component: UsuarioMusicoComponent, children: [
      { path: 'nuevo', component: UsuarioMusicoCreaeditaComponent },
      { path: 'edicion/:id', component: UsuarioMusicoCreaeditaComponent }
    ],
  },
  {
    path: 'navbar', component: NavbarComponent
  },
  {
    path: 'landing-page', component: LandingPageComponent
  },
  { path: '**', component:  LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
