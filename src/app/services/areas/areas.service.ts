import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {URL_SERVICIOS} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(private http: HttpClient) { }

  obtenerAreas(){
    return this.http.get(URL_SERVICIOS + 'area/').pipe(
      map((resp: any) => {        
        return resp.areas;
      })
    );
    }
}
