import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClienteService} from "../service/cliente.service";
import {Subscription} from "rxjs";
import {Cliente, Email, Endereco, Telefone} from "../model/cliente.model";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit, OnDestroy {
  usuario: any;
  transacao: any;
  sub = new Subscription();
  // @ts-ignore
  clienteRetorno: Cliente;
  formCliente: FormGroup = this.fb.group({
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
      email: [null, Validators.email],
      listaEmail: [null, Validators.required]
    }),
    telefone: this.fb.group({
      ddd: [null, [Validators.minLength(2), Validators.maxLength(2)]],
      numero: [null, [Validators.minLength(8), Validators.maxLength(9)]],
      tipoTelefoneId: [null],
      listaTelefone: [null, [Validators.required]]
    })
  });
  id: number = 0;

  constructor(private activateRoute: ActivatedRoute,
              private service: ClienteService,
              private fb: FormBuilder
             ) {
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.transacao = params['transacao'];
      this.usuario = params['login'];
      this.sub.add(this.service.obterCliente(this.id, this.usuario).subscribe(cliente => {
        this.clienteRetorno = cliente;
        this.montaFormBuilderValores(cliente);
      }));
    });
  }

  montaFormBuilderValores(cliente?: Cliente) {
    this.formCliente.get('nome')?.setValue(cliente?.nome);
    this.formCliente.get('cpf')?.setValue(cliente?.cpf);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  salvar() {
    const cliente = this.criarCliente();
    this.service.editar(cliente).subscribe(value => {
      alert("deu bom");
    });
  }

  criarCliente(): Cliente {
    return {
      login: this.usuario,
      idCliente: this.id,
      nome: this.formCliente.get('nome')?.value,
      cpf: this.formCliente.get('cpf')?.value,
      endereco: this.criarEndereco(this.formCliente.get('endereco')),
      emails: this.criarListaEmail(this.formCliente.get('emails')),
      telefones: this.criarListaTelefone(this.formCliente.get('telefone'))
    }
  }

  private criarEndereco(endereco: AbstractControl | null): Endereco {
    return {
      cep: endereco?.get('cep')?.value,
      logradouro: endereco?.get('logradouro')?.value,
      bairro: endereco?.get('bairro')?.value,
      cidade: endereco?.get('cidade')?.value,
      uf: endereco?.get('uf')?.value,
      complemento: endereco?.get('complemento')?.value,
    }
  }

  private criarListaEmail(email: AbstractControl | null): Email[] {
    const listaEmail = email?.get('listaEmail')?.value;
    return listaEmail;
  }

  private criarListaTelefone(telefone: AbstractControl | null): Telefone[] {
    const listaTelefone = telefone?.get('listaTelefone')?.value;
    return listaTelefone;
  }
}
