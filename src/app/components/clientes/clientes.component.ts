import { Component, OnInit } from '@angular/core';
import {ClienteService} from "./service/cliente.service";
import {Cliente} from "./model/cliente.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  constructor(private clienteService: ClienteService,
              private router: Router) { }

  ngOnInit(): void {
    this.clienteService.obterListaCliente().subscribe(retorno => {
      if(retorno.length > 0){
        this.clientes = retorno;
      }
    });
  }

  acao(id: number, transacao: number) {
    this.router.navigate(['/formulario'], {queryParams: {id: id, transacao: transacao}})
  }
}
