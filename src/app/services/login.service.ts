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

  usuario: Usuario;
  token:any;

  // tslint:disable-next-line: typedef
  login(usuario: Usuario){


    return this.http.post(URL_SERVICIOS + 'login/', usuario).pipe(
      map(
        (resp: any) => {
          this.guardarStorage(resp.token, resp.usuario)
          return true;
        }
      )
    );

  }

  guardarStorage(token: string, usuario: Usuario) {
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  
}

  logOut(){
    this.usuario = null;
    this.token = false;
      
    localStorage.setItem('token', 'false');
    localStorage.removeItem('usuario');

  }

  estaLogueado(){
    return this.token;
  }
}