import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';
import Swal from 'sweetalert2';
import { Limpieza } from 'src/app/models/limpieza';


@Injectable({
  providedIn: 'root'
})
export class LimpiezaService {

  constructor(private http: HttpClient) { }

  crearLimpieza(limpieza: Limpieza){
    return this.http.post(URL_SERVICIOS + 'limpieza/', limpieza).pipe(
      map((resp: any) => {
        // console.log(resp);
        if(!resp){
          Swal.fire(
            'Error al crear la limpieza',
            'You clicked the button!',
            'error'
          )
        }else{
          Swal.fire(
            'Se creo la limpieza correctamente',
            'You clicked the button!',
            'success'
          )
        }
        
        return true;
      })
    );
  }

  // tslint:disable-next-line: typedef
  obtenerLimpieza(){
    return this.http.get(URL_SERVICIOS + 'limpieza/').pipe(
      map((resp: any) => {

        return resp.limpieza;
      })
    );
  }

  // tslint:disable-next-line: typedef
  eliminaLimpieza(id: string){
    return this.http.delete(URL_SERVICIOS + 'limpieza/' + id).pipe(
      map((resp: any) => {
        Swal.fire(
          "Accesorio eliminado",
          "Accesorio eliminado correctamente",
          "success"
        )
        return  true;
      })
    );
  }
}
