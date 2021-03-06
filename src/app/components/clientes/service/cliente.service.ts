import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Cliente, ClienteSalvar} from "../model/cliente.model";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Login} from "../../login/model/login.model";

const API = environment.REST_URL


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  header = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  obterListaCliente(login: any): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(API + 'clientes', {params: this.montaLogin(login)});
  }

  obterCliente(id: number, login: any): Observable<Cliente> {

    return this.http.get<Cliente>(API + `clientes/${id}`, {params: this.montaLogin(login)});
  }

  editar(cliente: Cliente): Observable<any> {
    return this.http.put<any>(API + `clientes/alterar/${cliente.idCliente}`, cliente);
  }

  cadastrar(cliente: ClienteSalvar): Observable<any> {
    return this.http.post<any>(API + `clientes/cadastrar`, cliente);
  }

  deletar(id: number, login: any) {
    console.log('batei');
    return this.http.delete(API + `clientes/deletar/${id}`, {body: login});
  }

  montaLogin(login: any): HttpParams {
    let actorList = [login]
    let params = new HttpParams();
    params = params.append('login', actorList.join(', '));
    return params
  }

  buscarCep(cep: any) {
    return this.http.get(environment.API_CEP + cep + '/json');
  }
}
