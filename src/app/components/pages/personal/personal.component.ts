import { Component, OnInit } from '@angular/core';
import { Personal } from '../../../models/personal';
import { PersonalService } from '../../../services/personal/personal.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  personal: Personal[] = [];
  public page: number;
  nuevoPersonal = new Personal();
  editPersonal = new Personal();


  constructor( private _perService: PersonalService) { }

  ngOnInit(): void {
    this.cargarPersonal();
  }

  crearPersonal(form : NgForm){
    if(form.invalid){
      console.log("Formularo invalido");
      
    }
    
    this._perService.crearPersonal(this.nuevoPersonal).subscribe( () => this.cargarPersonal());
  }

  cargarPersonal(){
    this._perService.obtenerPersonal().subscribe(

      resultado =>{
        this.personal = resultado;
      }
    );
  }

  eliminarPersonal(personal: Personal){
    Swal.fire({
      title: '¿Estas seguro de que lo quieres eliminar?',
      text: 'Se eliminara la siguiente persona' + personal.personal_nombre,
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(borrar=>{
      if(borrar.isConfirmed){

        this._perService.eliminaPersonal(personal.id_personal).subscribe(   ()=>this.cargarPersonal());
      }
      else if(borrar.isDenied){
        Swal.fire('Cancelado','','info');
      }
    });
  }

  actualizarPersonal(form : NgForm){

    if(form.invalid){
      console.log("Formularo invalido");
      
    }   
     
  this._perService.actualizaPersonal(this.editPersonal).subscribe(  () => this.cargarPersonal());

  
    }




    obtenerPerUni(personal:  Personal){
          this.editPersonal = personal;
      
      }

  generarExcel(){
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(this.personal);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Personal'); // add the worksheet to the book
    let fecha = new Date().getDate() + '-' + new Date().getMonth()+1 + '-' + new Date().getFullYear();
    let nombre = fecha + '.xlsx'
    XLSX.writeFile(workBook, nombre); // initiate a file download in browser
  }
  
  buscarPersonal(termino: string) {
    if (termino.length <= 0) {
      this.cargarPersonal();
      return;
    }           
    this._perService.buscarPersonal(termino)
      .subscribe((personal: Personal[]) => this.personal = personal);
  

  }

}
