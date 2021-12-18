import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";
import {Observable, Subscription} from "rxjs";
import {LoginRetorno} from "./model/login.model";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  service$: Observable<LoginRetorno> | undefined;
  sub = new Subscription();
  errs: string[] = [];
  // @ts-ignore
  formLogin: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      login: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  click() {
    this.errs = [];
    this.loginService.obter(this.formLogin.get('login')?.value, this.formLogin.get('senha')?.value)
      .subscribe(value => {
      this.router.navigate(['clientes'], {queryParams: {login: value.usuario, perfil: value.perfil.perfil}});
      }, error => {
        if(error?.error.erro){
          this.errs?.push(error.error.erro)
        } else {
          this.errs.push('Falha ao se comunicar com o autenticador, tente novamente mais tarde!')
        }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
