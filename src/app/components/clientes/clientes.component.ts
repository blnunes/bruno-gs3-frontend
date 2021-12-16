import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: any = [];
  constructor() { }

  ngOnInit(): void {
    this.clientes.push({
      nome: "Nome",
      idade: 12
    });
    this.clientes.push({
      nome: "Nome2",
      idade: 123
    });
  }

  acao() {
    alert("works");
  }
}
