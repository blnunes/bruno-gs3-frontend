import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {HttpClientModule} from "@angular/common/http";
import {MenuComponent} from './components/menu/menu.component';
import {AppRoutingModule} from "./app-routing.module";
import {ErrorComponent} from './components/error/error.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteFormComponent } from './components/clientes/cliente-form/cliente-form.component';
import {NgxMaskModule} from "ngx-mask";
import { EnderecoFormComponent } from './components/clientes/cliente-form/endereco-form/endereco-form.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { EmailFormComponent } from './components/clientes/cliente-form/email-form/email-form.component';
import { TelefoneFormComponent } from './components/clientes/cliente-form/telefone-form/telefone-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ErrorComponent,
    ClientesComponent,
    ClienteFormComponent,
    EnderecoFormComponent,
    EmailFormComponent,
    TelefoneFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
