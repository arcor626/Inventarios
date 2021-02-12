import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';
import { Marcas } from '../../models/marcas';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private http: HttpClient) { }


  // crearServicio(servicio: Servicios){
  //   // validar id repetido
  //   return this.http.post(URL_SERVICIOS + 'servicios/', servicio).pipe(
  //     map((resp: any) => {
  //       console.log(resp);
  //       if(!resp){
  //         Swal.fire(
  //           'Error al crear el servicio',
  //           'You clicked the button!',
  //           'error'
  //         )
  //       }else{
  //         Swal.fire(
  //           'Se creo el servicio correctamente',
  //           'You clicked the button!',
  //           'success'
  //         )
  //       }
        
  //       return true;
  //     })
  //   );
  // }


  obtenerMarcas(){
    return this.http.get(URL_SERVICIOS + 'marcas/').pipe(
      map((resp: any) => {        
        return resp.marcas;
      })
    );
  }
}
