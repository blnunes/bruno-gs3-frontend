import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MenuComponent} from "./components/menu/menu.component";
import {ClientesComponent} from "./components/clientes/clientes.component";




const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'clientes',component:ClientesComponent},
  // { path: 'novo', component: NovoComponent, canActivate:[AdminGuardService]},
  // { path: 'editar', component: AlterarComponent, canActivate:[AdminGuardService]},
  // { path: 'historico', component: ListHistoricoComponent, canActivate:[AdminGuardService]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
