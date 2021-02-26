import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';
import { Accesorio } from 'src/app/models/accesorios';
import {Servicios} from 'src/app/models/servicios';
import Swal from 'sweetalert2';
import * as moment from 'moment';


import * as XLSX from 'xlsx';
import { AccesorioService } from '../../../services/accesorios/accesorio.service';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { PersonalService } from '../../../services/personal/personal.service';
import { AreasService } from '../../../services/areas/areas.service';

import { Proveedor } from '../../../models/proveedor';
import { Personal } from '../../../models/personal';
import { Areas } from '../../../models/areas';





@Component({
    selector: 'app-accesorios',
    templateUrl: './accesorios.component.html',
    styleUrls: ['./accesorios.component.css'],
  })
  export class AccesoriosComponent implements OnInit{
    accesorios: Accesorio[] = [];
    servicios: Servicios[] = [];
    proveedor: Proveedor[] = [];
    personal: Personal[] = [];
    areas: Areas[] = [];
    // accesorioActualizar: Accesorio;
    public page: number;
     nuevoAccesorio = new Accesorio();
     nuevoServicio = new Servicios();
     nuevoProveedor = new Proveedor();
    editAccesorio = new Accesorio();

    // tslint:disable-next-line: variable-name
    constructor( private _acceService: AccesorioService,
      private _servService: ServiciosService,
      private _provService: ProveedorService,
      private _perService: PersonalService,
      private _areService: AreasService
      ){}

  ngOnInit(){
    this.cargarAccesorios();
    this.cargarServicios();
    this.cargarProveedor();
    this.cargarPersonal();
    this.cargarAreas();
  }

  servicioSeleccionado(id: number){
    this.nuevoAccesorio.fk_id_servicio = id.toString();   
    this.editAccesorio.fk_id_servicio = id.toString();  
  }

  proveedorSeleccionado(id: number){
    this.nuevoAccesorio.fk_id_proveedor = id.toString(); 
    this.editAccesorio.fk_id_proveedor = id.toString();   

  }

  encargadoSeleccionado(id: number){
    this.nuevoAccesorio.fk_id_encargado = id.toString();   
    this.editAccesorio.fk_id_encargado = id.toString();   

  }

  areaSeleccionada(id: number){
    this.nuevoAccesorio.fk_id_area = id.toString(); 
    this.editAccesorio.fk_id_area = id.toString(); 

  }

  statusSeleccionado(id: number){
    this.editAccesorio.acc_status = id.toString();  
  }

  crearAccesorio(form : NgForm){
    if(form.invalid){
      console.log("Formularo invalido");    
      return;
    } 
    // console.log(this.nuevoAccesorio);   
    this._acceService.crearAccesorio(this.nuevoAccesorio).subscribe( () => this.cargarAccesorios())  

    
      // this.cargarAccesorios()
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


  cargarAccesorios(){
    this._acceService.obtenerAccesorios().subscribe(

      resultado =>{
        this.accesorios = resultado;
        
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

  eliminarAccesorio(accesorio: Accesorio){
    Swal.fire({
      title: '¿Estas de que lo quieres eliminar?',
      text: 'Se eliminara el siguiente accesorio' + accesorio.acc_especificaciones,
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(borrar=>{
      if(borrar.isConfirmed){

        this._acceService.eliminaAccesorio(accesorio.id_accesorio).subscribe(   () => this.cargarAccesorios());
      }
      else if(borrar.isDenied){
        Swal.fire('Cancelado', '', 'info');
      }
    });
  }

  // tslint:disable-next-line: typedef
  actualizarAccesorio(form : NgForm){

    if(form.invalid){
      console.log("Formularo invalido");
      
    }   
     
  this._acceService.actualizaAccesorio(this.editAccesorio).subscribe(  () => this.cargarAccesorios());

  console.log(this.editAccesorio);
  
    }




    obtenerAcceUni(accesorio:  Accesorio){
          this.editAccesorio = accesorio;

          if(this.editAccesorio.acc_fecha_asignacion == "No registrado"){

            this.editAccesorio.acc_fecha_asignacion = null;
          }
          console.log(this.editAccesorio);
          
      
      }

      
      generarExcel(){
        const workBook = XLSX.utils.book_new(); // create a new blank book
        const workSheet = XLSX.utils.json_to_sheet(this.accesorios);
    
        let myDate = new Date();
        let dia = myDate.getMonth() + 1;
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Accesorios'); // add the worksheet to the book
        let fecha = myDate.getDate() + '-' + dia + '-' + myDate.getFullYear();
        let nombre = 'Accesorios ' + fecha + '.xlsx';
         XLSX.writeFile(workBook, nombre); // initiate a file download in browser

        
        
      }

        buscarAccesorio(termino: string) {
          if (termino.length <= 0) {
            this.cargarAccesorios();
            return;
          }           
          this._acceService.buscarAccesorio(termino)
            .subscribe((accesorios: Accesorio[]) => this.accesorios = accesorios);
        
      
        }
  }

 


