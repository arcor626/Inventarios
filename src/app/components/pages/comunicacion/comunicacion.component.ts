import { Component, OnInit} from '@angular/core';
import {NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Comunicacion } from 'src/app/models/comunicacion';
import { ComunicacionService } from '../../../services/comunicacion/comunicacion.service';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { PersonalService } from '../../../services/personal/personal.service';
import { AreasService } from '../../../services/areas/areas.service';

import { Proveedor } from '../../../models/proveedor';
import { Personal } from '../../../models/personal';
import { Areas } from '../../../models/areas';
import {Servicios} from 'src/app/models/servicios';



@Component({
    selector: 'app-comunicacion',
    templateUrl: './comunicacion.component.html',
    styleUrls: ['./comunicacion.component.css'],
  })
  export class ComunicacionComponent implements OnInit{
    comunciaciones: Comunicacion[] = [];
    servicios: Servicios[] = [];
    proveedor: Proveedor[] = [];
    personal: Personal[] = [];
    areas: Areas[] = [];
    editComunicacion = new Comunicacion();


    public page: number;
    nuevaComunicacion = new Comunicacion();
     nuevoServicio = new Servicios();
     nuevoProveedor = new Proveedor();
    // tslint:disable-next-line: variable-name
    constructor( private _comService: ComunicacionService,
      private _servService: ServiciosService,
      private _provService: ProveedorService,
      private _perService: PersonalService,
      private _areService: AreasService){}

     // tslint:disable-next-line: typedef
  ngOnInit(){
    this.cargarComunicacion();
    this.cargarServicios();
    this.cargarProveedor();
    this.cargarPersonal();
    this.cargarAreas();

  }

  servicioSeleccionado(id: number){
    this.nuevaComunicacion.fk_id_servicio = id.toString();   
    this.editComunicacion.fk_id_servicio = id.toString();   
  }

  proveedorSeleccionado(id: number){
    this.nuevaComunicacion.fk_id_proveedor = id.toString();   
    this.editComunicacion.fk_id_proveedor = id.toString();   

  }

  encargadoSeleccionado(id: number){
    this.nuevaComunicacion.fk_id_encargado = id.toString(); 
    this.editComunicacion.fk_id_encargado = id.toString();   
  
  }

  areaSeleccionada(id: number){
    this.nuevaComunicacion.fk_id_area = id.toString();  
    this.editComunicacion.fk_id_area = id.toString();   
 
  }

  statusSeleccionado(id: number){
    this.editComunicacion.comp_status = id.toString();   
  }

  crearComunicacion(form : NgForm){
    if(form.invalid){
      console.log("Formularo invalido");   
      return; 
    } 
    // console.log(this.nuevoAccesorio);   
    this._comService.crearComunicacion(this.nuevaComunicacion).subscribe( () => this.cargarComunicacion());  
  }

  crearServicio(form : NgForm){
    if(form.invalid){
      console.log("Formularo invalido");
      return;
    }
    
    this._servService.crearServicio(this.nuevoServicio).subscribe(
      resultado =>{
        console.log(resultado);
      }

    )
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

  cargarComunicacion(){
    this._comService.obtenerComunicacion().subscribe(

      resultado =>{
        this.comunciaciones = resultado;
      }
    );
  }

  cargarServicios(){
    this._servService.obtenerServicios().subscribe(

      resultado =>{
        this.servicios = resultado;
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

  cargarPersonal(){
    this._perService.obtenerPersonal().subscribe(

      resultado =>{
        this.personal = resultado;
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


  // tslint:disable-next-line: typedef
  eliminarComunicacion(comunicacion: Comunicacion){
    Swal.fire({
      title: '¿Estas de que lo quieres eliminar?',
      text: 'Se eliminara la siguiente comunicacion ' + comunicacion.comp_especificaciones,
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(borrar=>{
      if(borrar.isConfirmed){

        this._comService.eliminaComunicacion(comunicacion.id_componente).subscribe(   ()=>this.cargarComunicacion);
      }
      else if(borrar.isDenied){
        Swal.fire('Cancelado','','info');
      }
    });
  }

  actualizarComunicacion(form : NgForm){

    if(form.invalid){
      console.log("Formularo invalido");
      
    }   
     
  this._comService.actualizaComunicacion(this.editComunicacion).subscribe(  () => this.cargarComunicacion());

  
    }




    obtenerComUni(comunicacion:  Comunicacion){
          this.editComunicacion = comunicacion;

          if(this.editComunicacion.comp_fecha_asignacion == "No registrado"){

            this.editComunicacion.comp_fecha_asignacion = null;
          }
          
      
      }

  generarExcel(){
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(this.comunciaciones);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Comunicacion'); // add the worksheet to the book
    let fecha = new Date().getDate() + '-' + new Date().getMonth()+1 + '-' + new Date().getFullYear();
    let nombre = fecha + '.xlsx'
    XLSX.writeFile(workBook, nombre); // initiate a file download in browser
  }

  buscarComunicacion(termino: string) {
    if (termino.length <= 0) {
      this.cargarComunicacion();
      return;
    }           
    this._comService.buscarComunicacion(termino)
      .subscribe((comunicacion: Comunicacion[]) => this.comunciaciones = comunicacion);
  

  }
}
