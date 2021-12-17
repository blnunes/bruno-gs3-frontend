import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MenuComponent} from "./components/menu/menu.component";
import {ClientesComponent} from "./components/clientes/clientes.component";
import {ClienteFormComponent} from "./components/clientes/cliente-form/cliente-form.component";




const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'clientes',component:ClientesComponent},
  { path: 'formulario', component: ClienteFormComponent},
  // { path: 'editar', component: AlterarComponent, canActivate:[AdminGuardService]},
  // { path: 'historico', component: ListHistoricoComponent, canActivate:[AdminGuardService]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
