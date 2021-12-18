import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cliente} from "../model/cliente.model";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

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

  obterListaCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(API + 'clientes')
  }

  obterCliente(id: number, cliente?: Cliente): Observable<Cliente> {

    return this.http.get<Cliente>(API + `clientes/${id}`)
  }

  editar(cliente: Cliente): Observable<any> {
    return this.http.put<any>(API + `clientes/alterar/${cliente.idCliente}`, cliente);
  }
}
