import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';
import Swal from 'sweetalert2';
import { Mobiliario } from 'src/app/models/mobiliario';


@Injectable({
  providedIn: 'root'
})
export class MobiliarioService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef


  crearMobiliario(mobiliario: Mobiliario){
    return this.http.post(URL_SERVICIOS + 'mobiliario/', mobiliario).pipe(
      map((resp: any) => {
        // console.log(resp);
        if(!resp){
          Swal.fire(
            'Error al crear el mobiliario',
            'You clicked the button!',
            'error'
          )
        }else{
          Swal.fire(
            'Se creo mobiliario correctamente',
            'You clicked the button!',
            'success'
          )
        }
        
        return true;
      })
    );
  }

  obtenerMobiliario(){
    return this.http.get(URL_SERVICIOS + 'mobiliario/').pipe(
      map((resp: any) => {

        return resp.mobiliario;
      })
    );
  }

  eliminaMobiliario(id: string){
    return this.http.delete(URL_SERVICIOS + 'mobiliario/' + id).pipe(
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
