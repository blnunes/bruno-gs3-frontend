import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClienteService} from "../service/cliente.service";
import {Subscription} from "rxjs";
import {Cliente} from "../model/cliente.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit, OnDestroy {

  sub = new Subscription();
  // @ts-ignore
  clienteRetorno: Cliente;
  // @ts-ignore
  formCliente: FormGroup;
  constructor(private activateRoute: ActivatedRoute,
  private service: ClienteService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      const id: number = params['id']
      this.sub.add(this.service.obterCliente(id).subscribe(cliente => {
        this.clienteRetorno = cliente;
      }))
    });
    this.formCliente = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cpf: [null, Validators.required],
      endereco: this.fb.group({
        cep: [null, Validators.required],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        uf: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        complemento: [null]
      }),
      emails: this.fb.group({
        email: [null, Validators.email]
      }),
      telefone: this.fb.group({
        ddd: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
      })
    });


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
