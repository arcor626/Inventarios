import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';
import Swal from 'sweetalert2';
import { Insumos } from 'src/app/models/insumos';


@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  constructor(private http: HttpClient) { }

  crearInsumos(insumos: Insumos){
    return this.http.post(URL_SERVICIOS + 'insumos/', insumos).pipe(
      map((resp: any) => {
        // console.log(resp);
        if(!resp){
          Swal.fire(
            'Error al crear los insumos',
            'You clicked the button!',
            'error'
          )
        }else{
          Swal.fire(
            'Se creo el insumo correctamente',
            'You clicked the button!',
            'success'
          )
        }
        
        return true;
      })
    );
  }

  // tslint:disable-next-line: typedef
  obtenerInsumos(){
    return this.http.get(URL_SERVICIOS + 'insumos/').pipe(
      map((resp: any) => {

        return resp.insumos;
      })
    );
  }

  buscarInsumos(termino: string){
    return this.http.get(URL_SERVICIOS + 'insumos/buscar/' + termino).pipe(
      map((resp: any) => {        

        return resp.insumos;
      })
    );
  }

  eliminaInsumos(id: string){
    return this.http.delete(URL_SERVICIOS + 'insumos/' + id).pipe(
      map((resp: any) => {
        Swal.fire(
          "Insumo eliminado",
          "Insumo eliminado correctamente",
          "success"
        )
        return  true;
      })
    );
  }

  actualizaInusmo(ins: Insumos){
    console.log(ins);
    return this.http.put(URL_SERVICIOS + 'insumos/' + ins.id_insumo, ins).pipe(
      map((resp: any) => {
        Swal.fire("Insumo actualizado", ins.id_insumo, "success");
        
        
        return  true;
      })
    );
  }

  agregarPieza(pieza : Insumos){
    return  this.http.put(URL_SERVICIOS + 'insumos/agregar/' + pieza.id_insumo, pieza).pipe(
        map((resp: any) => {        
          return  true;
        })
      );
    }
  
    quitarPieza(pieza : Insumos){
      return  this.http.put(URL_SERVICIOS + 'insumos/quitar/' + pieza.id_insumo, pieza).pipe(
          map((resp: any) => {        
            return  true;
          })
        );
      }
}
