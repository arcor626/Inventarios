import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';
import { Servicios } from '../../models/servicios';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }


  crearServicio(servicio: Servicios){
    // validar id repetido
    return this.http.post(URL_SERVICIOS + 'servicios/', servicio).pipe(
      map((resp: any) => {
        console.log(resp);
        if(!resp){
          Swal.fire(
            'Error al crear el servicio',
            'You clicked the button!',
            'error'
          )
        }else{
          Swal.fire(
            'Se creo el servicio correctamente',
            'You clicked the button!',
            'success'
          )
        }
        
        return true;
      })
    );
  }


  obtenerServicios(){
    return this.http.get(URL_SERVICIOS + 'servicios/').pipe(
      map((resp: any) => {        
        return resp.servicios;
      })
    );
  }
}
