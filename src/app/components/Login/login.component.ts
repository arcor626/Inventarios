import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuarios';
import { LoginService } from '../../services/login.service';
import { Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  })
  export class LoginComponent {
    // tslint:disable-next-line: variable-name
    constructor(public _loginService: LoginService,
      // tslint:disable-next-line: align
      public router: Router){

    }

    usuarioLogin = new Usuario();


    // tslint:disable-next-line: typedef
    login(form: NgForm){

      if (form.invalid){
        return;
      }

      this._loginService.login(this.usuarioLogin).subscribe(
        correcto => {
          this.router.navigate(['/Side']);
        }
      );
    }
  }
