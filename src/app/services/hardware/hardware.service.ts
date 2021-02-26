import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';
import Swal from 'sweetalert2';
import { Hardware } from 'src/app/models/hardware';


@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  constructor(private http: HttpClient) { }
  crearHardware(hardware: Hardware ){
    return this.http.post(URL_SERVICIOS + 'hardware/', hardware).pipe(
      map((resp: any) => {
        // console.log(resp);
        if(!resp){
          Swal.fire(
            'Error al crear el hardware',
            'You clicked the button!',
            'error'
          )
        }else{
          Swal.fire(
            'Se creo hardware correctamente',
            'You clicked the button!',
            'success'
          )
        }
        
        return true;
      })
    );
  }

  // tslint:disable-next-line: typedef
 
 
  obtenerHardware(){
    return this.http.get(URL_SERVICIOS + 'hardware/').pipe(
      map((resp: any) => {

        return resp.hardware;
      })
    );
  }

  buscarHardware(termino: string){
    return this.http.get(URL_SERVICIOS + 'hardware/buscar/' + termino).pipe(
      map((resp: any) => {        

        return resp.hardware;
      })
    );
  }

  // tslint:disable-next-line: typedef
  eliminaHardware(id: string){
    return this.http.delete(URL_SERVICIOS + 'hardware/' + id).pipe(
      map((resp: any) => {
        Swal.fire(
          "Hardware eliminado",
          "Hardware eliminado correctamente",
          "success"
        )
        return  true;
      })
    );
  }

  actualizaHardware(harwware: Hardware){
    console.log(harwware);
    return this.http.put(URL_SERVICIOS + 'hardware/' + harwware.id_hardware, harwware).pipe(
      map((resp: any) => {
        Swal.fire("Hardware actualizado", harwware.id_hardware, "success");
        
        
        return  true;
      })
    );
  }

}
