import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClienteService} from "../service/cliente.service";
import {Subscription} from "rxjs";
import {Cliente, ClienteSalvar, Email, Endereco, Telefone} from "../model/cliente.model";
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
      cep: [null, [Validators.required, Validators.minLength(8)]],
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
  perfil: any;

  constructor(private activateRoute: ActivatedRoute,
              private service: ClienteService,
              private fb: FormBuilder,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.transacao = params['transacao'];
      this.usuario = params['login'];
      this.perfil = params['perfil'];

      if (this.id !== 0) {
        this.sub.add(this.service.obterCliente(this.id, this.usuario).subscribe(cliente => {
          this.clienteRetorno = cliente;
          this.montaFormBuilderValores(cliente);
        }));
      }
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
    if(this.transacao === '1'){
      const cliente = this.criarClienteUpdate();
      this.service.editar(cliente).subscribe(value => {
          alert("Cliente alterado com sucesso!");
          this.router.navigate(['clientes'],{queryParams: {login: cliente.login, perfil: this.perfil}})
        }, error =>
          alert('Erro ao cadastrar/atualizar cliente')
      );
    } else if(this.transacao === '0'){
      const cliente = this.criarClienteSalvar();
      this.service.cadastrar(cliente).subscribe(value => {
          alert("Cliente cadastrado com sucesso!");
          this.router.navigate(['clientes'],{queryParams: {login: cliente.login, perfil: this.perfil}})
        }, error =>
          alert('Erro ao cadastrar/atualizar cliente')
      );
    }

  }

  criarClienteSalvar(): ClienteSalvar {
    return {
      login: this.usuario,
      nome: this.formCliente.get('nome')?.value,
      cpf: this.formCliente.get('cpf')?.value,
      endereco: this.criarEndereco(this.formCliente.get('endereco')),
      emails: this.criarListaEmail(this.formCliente.get('emails')),
      telefones: this.criarListaTelefone(this.formCliente.get('telefone'))
    }
  }

  criarClienteUpdate(): Cliente {
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
      cep: endereco?.get('cep')?.value.replace(/\.|\-/g, ''),
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

  voltar(){
    this.router.navigate(['clientes'],{queryParams: {login: this.usuario, perfil: this.perfil}})
  }
}
