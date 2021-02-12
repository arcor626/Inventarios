import { Component, OnInit} from '@angular/core';
import { Limpieza } from 'src/app/models/limpieza';
import { LimpiezaService } from '../../../services/limpieza/limpieza.service';
import Swal from 'sweetalert2';
import {NgForm } from '@angular/forms';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { AreasService } from '../../../services/areas/areas.service';
import { MarcasService } from '../../../services/marcas/marcas.service';


import { Proveedor } from '../../../models/proveedor';
import { Areas } from '../../../models/areas';
import { Marcas } from '../../../models/marcas';


@Component({
    selector: 'app-limpiesa',
    templateUrl: './limpieza.component.html',
    styleUrls: ['./limpieza.component.css'],
  })
  export class LimpiezaComponent implements OnInit{
    limpiezas: Limpieza[] = [];
    proveedor: Proveedor[] = [];
    areas: Areas[] = [];
    marcas: Marcas[] = [];
    public page: number;
    nuevaLimpieza = new Limpieza();
    nuevoProveedor = new Proveedor();
   editLimpieza = new Limpieza();


    // tslint:disable-next-line: variable-name
    constructor( private _limpService: LimpiezaService,
      private _provService: ProveedorService,
      private _areService: AreasService,
      private _marService: MarcasService
      ){}

    // tslint:disable-next-line: typedef
    ngOnInit(){
      this.cargarLimpieza();
      this.cargarProveedor();
      this.cargarAreas();
      this.cargarMarcas();
    }

    proveedorSeleccionado(id: number){
      this.nuevaLimpieza.fk_id_proveedor = id.toString(); 
      this.editLimpieza.fk_id_proveedor = id.toString();   
  
    }
  
  
    areaSeleccionada(id: number){
      this.nuevaLimpieza.fk_id_area = id.toString(); 
      this.editLimpieza.fk_id_area = id.toString(); 
  
    }

    marcaSeleccionada(id: number){
      this.nuevaLimpieza.fk_id_marca = id.toString(); 
      this.editLimpieza.fk_id_marca = id.toString(); 
  
    }
  
    statusSeleccionado(id: number){
      this.editLimpieza.limp_status = id.toString();  
    }

    // tslint:disable-next-line: typedef
    cargarLimpieza(){
      this._limpService.obtenerLimpieza().subscribe(
  
        resultado =>{
          this.limpiezas = resultado;
        }
      );
    }

    cargarProveedor(){
      this._provService.obtenerProveedor().subscribe(
  
        resultado =>{
          this.proveedor = resultado;
        }
      );
    }
  
    cargarMarcas(){
      this._marService.obtenerMarcas().subscribe(
  
        resultado =>{
          this.marcas = resultado;
        }
      );
    }
  
    cargarAreas(){
      this._areService.obtenerAreas().subscribe(
  
        resultado =>{
          this.areas = resultado;
        }
      );
    }

    crearLimpieza(form : NgForm){
      if(form.invalid){
        console.log("Formularo invalido"); 
        return;   
      } 
      // console.log(this.nuevoAccesorio);   
      this._limpService.crearLimpieza(this.nuevaLimpieza).subscribe(
        resultado =>{      
        }
        );  
    }

    crearProveedor(form : NgForm){
      if(form.invalid){
        console.log("Formularo invalido");
        return;
      }
      
      this._provService.crearProveedor(this.nuevoProveedor).subscribe(
        resultado =>{
          console.log(resultado);
        }
  
      )
    }

    // tslint:disable-next-line: typedef
    eliminarLimpieza(limpieza: Limpieza){
      Swal.fire({
        title: '¿Estas de que lo quieres eliminar?',
        text: 'Se eliminara la siguiente limpieza ' + limpieza.limp_producto,
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(borrar=>{
        if(borrar.isConfirmed){
  
          this._limpService.eliminaLimpieza(limpieza.id_limpieza).subscribe(   ()=>this.cargarLimpieza());
        }
        else if(borrar.isDenied){
          Swal.fire('Cancelado','','info');
        }
      });
    }
  }
