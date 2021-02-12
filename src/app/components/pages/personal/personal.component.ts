import { Component, OnInit } from '@angular/core';
import { Personal } from '../../../models/personal';
import { PersonalService } from '../../../services/personal/personal.service';
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


  constructor( private _perService: PersonalService) { }

  ngOnInit(): void {
    this.cargarPersonal();
  }

  crearPersonal(form : NgForm){
    if(form.invalid){
      console.log("Formularo invalido");
      
    }
    
    this._perService.crearPersonal(this.nuevoPersonal).subscribe(
      resultado =>{
        console.log(resultado);
      }

    )
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

}
