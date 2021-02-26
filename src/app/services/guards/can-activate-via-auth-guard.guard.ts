import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios';
import { LoginService } from '../login.service';
import { Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CanActivateViaAuthGuardGuard implements CanActivate {
  constructor(private _loginServices : LoginService,
    public router: Router
    ){}

  canActivate(){
        
    if (!this._loginServices.estaLogueado()) {
      console.log('No estás logueado');
      this.router.navigate(['/Login']);
      return false;
  } else{
    console.log("Estas logueado");
    
    return true;
  }

  return true;

  }
  
}
