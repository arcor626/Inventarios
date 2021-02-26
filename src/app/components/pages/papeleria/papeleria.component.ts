import { Component, OnInit} from '@angular/core';
import { Papeleria } from 'src/app/models/papeleria';
import { PapeleriaService } from '../../../services/papeleria/papeleria.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import {NgForm } from '@angular/forms';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { AreasService } from '../../../services/areas/areas.service';
import { MarcasService } from '../../../services/marcas/marcas.service';


import { Proveedor } from '../../../models/proveedor';
import { Areas } from '../../../models/areas';
import { Marcas } from '../../../models/marcas';


@Component({
    selector: 'app-papeleria',
    templateUrl: './papeleria.component.html',
    styleUrls: ['./papeleria.component.css'],
  })
  export class PapeleriaComponent implements OnInit{
    papelerias: Papeleria[] = [];
    proveedor: Proveedor[] = [];
    areas: Areas[] = [];
    marcas: Marcas[] = [];
    public page: number;
    nuevaPapeleria = new Papeleria();
    nuevoProveedor = new Proveedor();
   editPapeleria = new Papeleria();

    // tslint:disable-next-line: variable-name
    constructor( private _papeService: PapeleriaService,
      private _provService: ProveedorService,
      private _areService: AreasService,
      private _marService: MarcasService
      ){}

    // tslint:disable-next-line: typedef
    ngOnInit(){
      this.cargarPapeleria();
      this.cargarProveedor();
      this.cargarAreas();
      this.cargarMarcas();

    }

    proveedorSeleccionado(id: number){
      this.nuevaPapeleria.fk_id_proveedor = id.toString(); 
      this.editPapeleria.fk_id_proveedor = id.toString();   
  
    }
  
  
    areaSeleccionada(id: number){
      this.nuevaPapeleria.fk_id_area = id.toString(); 
      this.editPapeleria.fk_id_area = id.toString(); 
  
    }

    marcaSeleccionada(id: number){
      this.nuevaPapeleria.fk_id_marca = id.toString(); 
      this.editPapeleria.fk_id_marca = id.toString(); 
  
    }
  
    

    // tslint:disable-next-line: typedef
    cargarPapeleria(){
      this._papeService.obtenerPapeleria().subscribe(
  
        resultado =>{
          this.papelerias = resultado;
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


    crearPapeleria(form : NgForm){
      if(form.invalid){
        console.log("Formularo invalido");    
        return;
      } 
      // console.log(this.nuevoAccesorio);   
      this._papeService.crearPapeleria(this.nuevaPapeleria).subscribe( () => this.cargarPapeleria());  
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
    eliminarPapeleria(papeleria: Papeleria){
      Swal.fire({
        title: '¿Estas de que lo quieres eliminar?',
        text: 'Se eliminara la siguiente papeleria' + papeleria.pape_producto,
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(borrar=>{
        if(borrar.isConfirmed){
  
          this._papeService.eliminaPapeleria(papeleria.id_papeleria).subscribe(   ()=>this.cargarPapeleria());
        }
        else if(borrar.isDenied){
          Swal.fire('Cancelado','','info');
        }
      });
    }

    actualizarPapeleria(form : NgForm){

      if(form.invalid){
        console.log("Formularo invalido");
        
      }   
       
    this._papeService.actualizaPapeleria(this.editPapeleria).subscribe(  () => this.cargarPapeleria());
  
    
      }
  
  
  
  
      obtenerPapeUni(papeleria:  Papeleria){
            this.editPapeleria = papeleria;
        
        }

    generarExcel(){
      const workBook = XLSX.utils.book_new(); // create a new blank book
      const workSheet = XLSX.utils.json_to_sheet(this.papelerias);
  
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Papeleria'); // add the worksheet to the book
      let fecha = new Date().getDate() + '-' + new Date().getMonth()+1 + '-' + new Date().getFullYear();
      let nombre = fecha + '.xlsx'
      XLSX.writeFile(workBook, nombre); // initiate a file download in browser
    }

    buscarPapeleria(termino: string) {
      if (termino.length <= 0) {
        this.cargarPapeleria();
        return;
      }           
      this._papeService.buscarPapeleria(termino)
        .subscribe((papeleria: Papeleria[]) => this.papelerias = papeleria);
    
  
    }

    agregar( papeleria : Papeleria){
        console.log("Estas agregando");
        this._papeService.agregarPieza(papeleria).subscribe( ()=> this.cargarPapeleria() );
        

    }

    quitar(papeleria : Papeleria){
        console.log("Estas quitando");
        this._papeService.quitarPieza(papeleria).subscribe( ()=> this.cargarPapeleria() );

    }
  }
