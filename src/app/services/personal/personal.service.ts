import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';
import { Personal } from 'src/app/models/personal';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http: HttpClient) { }

  crearPersonal(personal: Personal){
    return this.http.post(URL_SERVICIOS + 'personal/', personal).pipe(
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

  obtenerPersonal(){
    return this.http.get(URL_SERVICIOS + 'personal/').pipe(
      map((resp: any) => {        
        return resp.personal;
      })
    );
    }

    eliminaPersonal(id: string){
      return this.http.delete(URL_SERVICIOS + 'personal/' + id).pipe(
        map((resp: any) => {
          Swal.fire(
            "Personal eliminado",
            "Personal eliminado correctamente",
            "success"
          )
          return  true;
        })
      );
    }
}
