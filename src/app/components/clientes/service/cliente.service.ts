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

  constructor(private http: HttpClient) { }

  obterListaCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(API + 'clientes'  )
  }


  obterCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(API + `clientes/${id}`  )
  }
}
