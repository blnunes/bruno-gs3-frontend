import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login, LoginRetorno} from "../model/login.model";
import {environment} from "../../../../environments/environment";

const API = environment.REST_URL

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  obter(user: string, pass: string): Observable<LoginRetorno> {
    return this.http.get<LoginRetorno>(API + 'autenticar-login', {
      params: {
        user: user,
        pass: pass
      }
    })
  }
}
