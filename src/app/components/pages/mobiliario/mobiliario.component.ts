import { Component, OnInit} from '@angular/core';
import { Mobiliario } from 'src/app/models/mobiliario';
import { MobiliarioService } from '../../../services/mobiliario/mobiliario.service';
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
    selector: 'app-mobiliario',
    templateUrl: './mobiliario.component.html',
    styleUrls: ['./mobiliario.component.css'],
  })
  export class MobiliarioComponent implements OnInit{
    mobiliarios: Mobiliario[] = [];
    servicios: Servicios[] = [];
    proveedor: Proveedor[] = [];
    personal: Personal[] = [];
    areas: Areas[] = [];

    public page: number;

    nuevoMobiliario = new Mobiliario();
     nuevoServicio = new Servicios();
     nuevoProveedor = new Proveedor();
    editMobiliario = new Mobiliario();
    // tslint:disable-next-line: variable-name
    constructor( private _mobService: MobiliarioService,
      private _servService: ServiciosService,
      private _provService: ProveedorService,
      private _perService: PersonalService,
      private _areService: AreasService
      ){}

    // tslint:disable-next-line: typedef
    ngOnInit(){
      this.cargarMobiliario();
      this.cargarServicios();
      this.cargarProveedor();
      this.cargarPersonal();
      this.cargarAreas();

    }

    servicioSeleccionado(id: number){
      this.nuevoMobiliario.fk_id_servicio = id.toString();   
      this.editMobiliario.fk_id_servicio = id.toString();  
    }
  
    proveedorSeleccionado(id: number){
      this.nuevoMobiliario.fk_id_proveedor = id.toString(); 
      this.editMobiliario.fk_id_proveedor = id.toString();   
  
    }
  
    encargadoSeleccionado(id: number){
      this.nuevoMobiliario.fk_id_encargado = id.toString();   
      this.editMobiliario.fk_id_encargado = id.toString();   
  
    }
  
    areaSeleccionada(id: number){
      this.nuevoMobiliario.fk_id_area = id.toString(); 
      this.editMobiliario.fk_id_area = id.toString(); 
  
    }
  
    statusSeleccionado(id: number){
      this.editMobiliario.mob_status = id.toString();  
    }

    // tslint:disable-next-line: typedef
    cargarMobiliario(){
      this._mobService.obtenerMobiliario().subscribe(
        resultado => {
          this.mobiliarios = resultado;
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

    crearMobiliario(form : NgForm){
      if(form.invalid){
        console.log("Formularo invalido");
        return;    
      } 
      // console.log(this.nuevoAccesorio);   
      this._mobService.crearMobiliario(this.nuevoMobiliario).subscribe( () => this.cargarMobiliario());  
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
    eliminarMobiliario(mobiliario: Mobiliario){
      Swal.fire({
        title: '¿Estas de que lo quieres eliminar?',
        text: 'Se eliminara el siguiente mobiliario ' + mobiliario.mob_especificaciones,
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(borrar=>{
        if(borrar.isConfirmed){
  
          this._mobService.eliminaMobiliario(mobiliario.id_mobiliario).subscribe(   ()=>this.cargarMobiliario());
        }
        else if(borrar.isDenied){
          Swal.fire('Cancelado','','info');
        }
      });
    }

    actualizarMobiliario(form : NgForm){

      if(form.invalid){
        console.log("Formularo invalido");
        
      }   
       
    this._mobService.actualizaMobiliario(this.editMobiliario).subscribe(  () => this.cargarMobiliario());
  
    console.log(this.editMobiliario);
    
      }

      obtenerMobUni(mobiliario:  Mobiliario){
        this.editMobiliario = mobiliario;

        if(this.editMobiliario.mob_fecha_asignacion == "No registrado"){

          this.editMobiliario.mob_fecha_asignacion = null;
        }
        // console.log(this.editMobiliario);
        
    
    }

    generarExcel(){
      const workBook = XLSX.utils.book_new(); // create a new blank book
      const workSheet = XLSX.utils.json_to_sheet(this.mobiliarios);
  
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Mobiliarios'); // add the worksheet to the book
      let fecha = new Date().getDate() + '-' + new Date().getMonth()+1 + '-' + new Date().getFullYear();
      let nombre = fecha + '.xlsx'
      XLSX.writeFile(workBook, nombre); // initiate a file download in browser
    }

    buscarMobiliario(termino: string) {
      if (termino.length <= 0) {
        this.cargarMobiliario();
        return;
      }           
      this._mobService.buscarMobiliario(termino)
        .subscribe((mobiliario: Mobiliario[]) => this.mobiliarios = mobiliario);
    
  
    }
  }

