import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../models/usuarios';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) {}

  // tslint:disable-next-line: typedef
  login(usuario: Usuario){


    return this.http.post(URL_SERVICIOS + 'login/', usuario).pipe(
      map(
        (resp: any) => {
          return true;
        }
      )
    );

  }
}
