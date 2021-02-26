import { Component, OnInit} from '@angular/core';
import { Hardware } from 'src/app/models/hardware';
import { HardwareService } from '../../../services/hardware/hardware.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

import {NgForm } from '@angular/forms';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { PersonalService } from '../../../services/personal/personal.service';
import { AreasService } from '../../../services/areas/areas.service';

import { Proveedor } from '../../../models/proveedor';
import { Personal } from '../../../models/personal';
import { Areas } from '../../../models/areas';
import {Servicios} from 'src/app/models/servicios';


@Component({
    selector: 'app-hardware',
    templateUrl: './hardware.component.html',
    styleUrls: ['./hardware.component.css'],
  })
  export class HardwareComponent implements OnInit{
    hardwares: Hardware[] = [];
    servicios: Servicios[] = [];
    proveedor: Proveedor[] = [];
    personal: Personal[] = [];
    areas: Areas[] = [];
    public page: number;
    nuevoHardware = new Hardware();
    nuevoServicio = new Servicios();
    nuevoProveedor = new Proveedor();
   editHardware = new Hardware();

    // tslint:disable-next-line: variable-name
    constructor( private _hwdService: HardwareService,
      private _servService: ServiciosService,
      private _provService: ProveedorService,
      private _perService: PersonalService,
      private _areService: AreasService
      ){}

    // tslint:disable-next-line: typedef
    ngOnInit(){
      this.cargarHardware();
      this.cargarServicios();
      this.cargarProveedor();
      this.cargarPersonal();
      this.cargarAreas();
    }

    servicioSeleccionado(id: number){
      this.nuevoHardware.fk_id_servicio = id.toString();   
      this.editHardware.fk_id_servicio = id.toString();  
    }
  
    proveedorSeleccionado(id: number){
      this.nuevoHardware.fk_id_proveedor = id.toString(); 
      this.editHardware.fk_id_proveedor = id.toString();   
  
    }
  
    encargadoSeleccionado(id: number){
      this.nuevoHardware.fk_id_encargado = id.toString();   
      this.editHardware.fk_id_encargado = id.toString();   
  
    }


    encargadoAnteSeleccionado(id: number){
      this.editHardware.fk_id_encarg_ante = id.toString();   
  
    }
  
    areaSeleccionada(id: number){
      this.nuevoHardware.fk_id_area = id.toString(); 
      this.editHardware.fk_id_area = id.toString(); 
  
    }
  
    statusSeleccionado(id: number){
      this.editHardware.hwd_status = id.toString();  
    }

    // tslint:disable-next-line: typedef
    cargarHardware(){
      this._hwdService.obtenerHardware().subscribe(
        resultado => {
          this.hardwares = resultado;
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

    crearHardware(form : NgForm){
      if(form.invalid){
        console.log("Formularo invalido");    
        return;
      } 
      // console.log(this.nuevoAccesorio);   
      this._hwdService.crearHardware(this.nuevoHardware).subscribe( () => this.cargarHardware());  
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

    // tslint:disable-next-line: typedef
    eliminarHardware(hardware: Hardware){
      Swal.fire({
        title: '¿Estas de que lo quieres eliminar?',
        text: 'Se eliminara el siguiente hardware ' + hardware.hwd_especificaciones,
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(borrar=>{
        if(borrar.isConfirmed){
  
          this._hwdService.eliminaHardware(hardware.id_hardware).subscribe(   ()=>this.cargarHardware());
        }
        else if(borrar.isDenied){
          Swal.fire('Cancelado','','info');
        }
      });
    }

    actualizarHardware(form : NgForm){

      if(form.invalid){
        console.log("Formularo invalido");
        
      }   
       
    this._hwdService.actualizaHardware(this.editHardware).subscribe(  () => this.cargarHardware());
  
    console.log(this.editHardware);
    
      }
  
  
  
  
      obtenerHwdUni(hardware:  Hardware){
            this.editHardware = hardware;
  
            if(this.editHardware.hwd_fecha_asignacion == "No registrado"){
  
              this.editHardware.hwd_fecha_asignacion = null;
            }
            console.log(this.editHardware);
            
        
        }

    generarExcel(){
      const workBook = XLSX.utils.book_new(); // create a new blank book
      const workSheet = XLSX.utils.json_to_sheet(this.hardwares);
  
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Hardware'); // add the worksheet to the book
      let fecha = new Date().getDate() + '-' + new Date().getMonth()+1 + '-' + new Date().getFullYear();
      let nombre = fecha + '.xlsx'
      XLSX.writeFile(workBook, nombre); // initiate a file download in browser
    }

    buscarHardware(termino: string) {
      if (termino.length <= 0) {
        this.cargarHardware();
        return;
      }           
      this._hwdService.buscarHardware(termino)
        .subscribe((hardware: Hardware[]) => this.hardwares = hardware);
    
  
    }

  }
