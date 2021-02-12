import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';
import Swal from 'sweetalert2';
import { Accesorio } from 'src/app/models/accesorios';


@Injectable({
  providedIn: 'root'
})
export class AccesorioService {

  constructor(private http: HttpClient) { }
    
  crearAccesorio(accesorio: Accesorio){
    return this.http.post(URL_SERVICIOS + 'accesorios/', accesorio).pipe(
      map((resp: any) => {
        // console.log(resp);
        if(!resp){
          Swal.fire(
            'Error al crear el accesorio',
            'You clicked the button!',
            'error'
          )
        }else{
          Swal.fire(
            'Se creo accesorio correctamente',
            'You clicked the button!',
            'success'
          )
        }
        
        return true;
      })
    );
  }


  // tslint:disable-next-line: typedef
  obtenerAccesorios(){

    return this.http.get(URL_SERVICIOS + 'accesorios/').pipe(
      map((resp: any) => {
        // console.log(resp.accesorios);
        
        return resp.accesorios;
      })
    );
  }

  // tslint:disable-next-line: typedef
  obtenAccesorioUnico(id: string){
    return this.http.get(URL_SERVICIOS + 'accesorios/' + id).pipe(
      map((resp: any) => {        

        return resp.accesorio;
      })
    );
  }

  // tslint:disable-next-line: typedef
  eliminaAccesorio(id: string){
    return this.http.delete(URL_SERVICIOS + 'accesorios/' + id).pipe(
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

  actualizaAccesorio(acce: Accesorio){
    return this.http.put(URL_SERVICIOS + 'accesorios/' + acce.id_accesorio, acce).pipe(
      map((resp: any) => {
        Swal.fire("Accesorio actualizado", acce.id_accesorio, "success");
        return  true;
      })
    );
  }

}
