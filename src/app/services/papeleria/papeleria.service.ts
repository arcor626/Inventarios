import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';
import Swal from 'sweetalert2';
import { Papeleria } from 'src/app/models/papeleria';


@Injectable({
  providedIn: 'root'
})
export class PapeleriaService {

  constructor(private http: HttpClient) { }

  crearPapeleria(papeleria: Papeleria){
    return this.http.post(URL_SERVICIOS + 'papeleria/', papeleria).pipe(
      map((resp: any) => {
        // console.log(resp);
        if(!resp){
          Swal.fire(
            'Error al crear la papeleria',
            'You clicked the button!',
            'error'
          )
        }else{
          Swal.fire(
            'Se creo la papeleria correctamente',
            'You clicked the button!',
            'success'
          )
        }
        
        return true;
      })
    );
  }

  obtenerPapeleria(){
    return this.http.get(URL_SERVICIOS + 'papeleria/').pipe(
      map((resp: any) => {

        return resp.papeleria;
      })
    );
  }

  eliminaPapeleria(id: string){
    return this.http.delete(URL_SERVICIOS + 'papeleria/' + id).pipe(
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
