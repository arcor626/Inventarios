import { Component, OnInit} from '@angular/core';
import { Limpieza } from 'src/app/models/limpieza';
import { LimpiezaService } from '../../../services/limpieza/limpieza.service';
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
      this._limpService.crearLimpieza(this.nuevaLimpieza).subscribe( () => this.cargarLimpieza());  
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

    actualizarLimpieza(form : NgForm){

      if(form.invalid){
        console.log("Formularo invalido");
        
      }   
       
    this._limpService.actualizaLimpieza(this.editLimpieza).subscribe(  () => this.cargarLimpieza());
  
    
      }
  
  
  
  
      obtenerLimpUni(limpieza:  Limpieza){
            this.editLimpieza = limpieza;

        }

    generarExcel(){
      const workBook = XLSX.utils.book_new(); // create a new blank book
      const workSheet = XLSX.utils.json_to_sheet(this.limpiezas);
  
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Limpieza'); // add the worksheet to the book
      let fecha = new Date().getDate() + '-' + new Date().getMonth()+1 + '-' + new Date().getFullYear();
      let nombre = fecha + '.xlsx'
      XLSX.writeFile(workBook, nombre); // initiate a file download in browser
    }

    buscarLimpieza(termino: string) {
      if (termino.length <= 0) {
        this.cargarLimpieza();
        return;
      }           
      this._limpService.buscarLimpieza(termino)
        .subscribe((limpieza: Limpieza[]) => this.limpiezas = limpieza);
    
  
    }

    agregar( limpieza : Limpieza){
      console.log("Estas agregando");
      this._limpService.agregarPieza(limpieza).subscribe( ()=> this.cargarLimpieza() );
      

  }

  quitar(limpieza : Limpieza){
      console.log("Estas quitando");
      this._limpService.quitarPieza(limpieza).subscribe( ()=> this.cargarLimpieza() );

  }
  }
