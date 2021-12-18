import {Component, OnInit} from '@angular/core';
import {ClienteService} from "./service/cliente.service";
import {Cliente} from "./model/cliente.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  isAdm = false;
  clientes: Cliente[] = [];
  // @ts-ignore
  login: string;
  // @ts-ignore
  perfil: string;
  isComum = false;
  sub = new Subscription();
  constructor(private clienteService: ClienteService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.login = params['login'];
      this.perfil = params['perfil'];
      this.constroiAcesso();
      this.sub.add(this.clienteService.obterListaCliente(this.login).subscribe(retorno => {
        if(retorno.length > 0){
          this.clientes = retorno;
        }
      }));
    });

  }

  constroiAcesso() {
    this.isAdm = this.perfil === 'ADMIN';
    this.isComum = this.perfil === 'COMUM';
  }

  acao(id: number, transacao: number) {
    if(transacao === 3){
      this.sub.unsubscribe();
      this.clienteService.deletar(id, this.login).subscribe(valor => {
        alert('Excluído com sucesso!')
        this.clienteService.obterListaCliente(this.login).subscribe(retorno => {
          this.clientes = retorno;
        });
      });
    } else {
      this.router.navigate(['/formulario'], {queryParams: {id: id, transacao: transacao, login: this.login, perfil: this.perfil}})
    }
  }
}
