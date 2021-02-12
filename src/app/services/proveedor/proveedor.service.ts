import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';
import { Proveedor } from '../../models/proveedor';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  crearProveedor(servicio: Proveedor){
    // validar id repetido
    return this.http.post(URL_SERVICIOS + 'proveedor/', servicio).pipe(
      map((resp: any) => {
        console.log(resp);
        if(!resp){
          Swal.fire(
            'Error al crear el proveedor',
            'You clicked the button!',
            'error'
          )
        }else{
          Swal.fire(
            'Se creo el proveedor correctamente',
            'You clicked the button!',
            'success'
          )
        }
        
        return true;
      })
    );
  }

  obtenerProveedor(){
    return this.http.get(URL_SERVICIOS + 'proveedor/').pipe(
      map((resp: any) => {        
        return resp.proveedor;
      })
    );
  }
}
