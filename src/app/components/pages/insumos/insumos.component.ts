import { Component, OnInit} from '@angular/core';
import { Insumos } from 'src/app/models/insumos';
import { InsumosService } from '../../../services/insumos/insumos.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import {NgForm } from '@angular/forms';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { AreasService } from '../../../services/areas/areas.service';
import { MarcasService } from '../../../services/marcas/marcas.service';


import { Proveedor } from '../../../models/proveedor';
import { Areas } from '../../../models/areas';
import { Marcas } from '../../../models/marcas';

@Component({
    selector: 'app-insumos',
    templateUrl: './insumos.component.html',
    styleUrls: ['./insumos.component.css'],
  })
  export class InsumosComponent implements OnInit{
    insumo: Insumos[] = [];
    proveedor: Proveedor[] = [];
    areas: Areas[] = [];
    marcas: Marcas[] = [];
    public page: number;
    nuevoInsumo = new Insumos();
    nuevoProveedor = new Proveedor();
   editInsumos = new Insumos();
    // tslint:disable-next-line: variable-name
    constructor( private _insService: InsumosService,
      private _provService: ProveedorService,
      private _areService: AreasService,
      private _marService: MarcasService
      ){}

    // tslint:disable-next-line: typedef
    ngOnInit(){
      this.cargarInsumos();
      this.cargarProveedor();
      this.cargarAreas();
      this.cargarMarcas();
    }

    proveedorSeleccionado(id: number){
      this.nuevoInsumo.fk_id_proveedor = id.toString(); 
      this.editInsumos.fk_id_proveedor = id.toString();   
  
    }
  
  
    areaSeleccionada(id: number){
      this.nuevoInsumo.fk_id_area = id.toString(); 
      this.editInsumos.fk_id_area = id.toString(); 
  
    }

    marcaSeleccionada(id: number){
      this.nuevoInsumo.fk_id_marca = id.toString(); 
      this.editInsumos.fk_id_marca = id.toString(); 
  
    }
  

    // tslint:disable-next-line: typedef
    cargarInsumos(){
      this._insService.obtenerInsumos().subscribe(
  
        resultado =>{
          this.insumo = resultado;
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


    crearInsumos(form : NgForm){
      if(form.invalid){
        console.log("Formularo invalido");   
        return; 
      } 
      console.log(this.nuevoInsumo);   
      this._insService.crearInsumos(this.nuevoInsumo).subscribe( () => this.cargarInsumos());  
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
    eliminarInsumos(insumos: Insumos){
      Swal.fire({
        title: '¿Estas de que lo quieres eliminar?',
        text: 'Se eliminara el siguiente insumo ' + insumos.ins_producto,
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(borrar=>{
        if(borrar.isConfirmed){
  
          this._insService.eliminaInsumos(insumos.id_insumo).subscribe(   ()=>this.cargarInsumos());
        }
        else if(borrar.isDenied){
          Swal.fire('Cancelado','','info');
        }
      });
    }

    actualizarInsumos(form : NgForm){

      if(form.invalid){
        console.log("Formularo invalido");
        
      }   
       
    this._insService.actualizaInusmo(this.editInsumos).subscribe(  () => this.cargarInsumos());
  
    
      }
 
      obtenerInsUni(insumo:  Insumos){
            this.editInsumos = insumo;
        
        }

    generarExcel(){
      const workBook = XLSX.utils.book_new(); // create a new blank book
      const workSheet = XLSX.utils.json_to_sheet(this.insumo);
  
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Insumo'); // add the worksheet to the book
      let fecha = new Date().getDate() + '-' + new Date().getMonth()+1 + '-' + new Date().getFullYear();
      let nombre = fecha + '.xlsx'
      XLSX.writeFile(workBook, nombre); // initiate a file download in browser
    }

    buscarInsumos(termino: string) {
      if (termino.length <= 0) {
        this.cargarInsumos();
        return;
      }           
      this._insService.buscarInsumos(termino)
        .subscribe((insumos: Insumos[]) => this.insumo = insumos);
    
  
    }

    agregar( insumos : Insumos){
      console.log("Estas agregando");
      this._insService.agregarPieza(insumos).subscribe( ()=> this.cargarInsumos() );
      

  }

  quitar(insumos : Insumos){
      console.log("Estas quitando");
      this._insService.quitarPieza(insumos).subscribe( ()=> this.cargarInsumos() );

  }
  }
