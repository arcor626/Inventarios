import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/Login/login.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { MobiliarioComponent } from './components/pages/mobiliario/mobiliario.component';
import { HardwareComponent } from './components/pages/hardware/hardware.component';
import { ComunicacionComponent } from './components/pages/comunicacion/comunicacion.component';
import { AccesoriosComponent } from './components/pages/acccesorios/accesorios.component';
import { LimpiezaComponent } from './components/pages/limpieza/limpieza.component';
import { PapeleriaComponent } from './components/pages/papeleria/papeleria.component';
import { InsumosComponent } from './components/pages/insumos/insumos.component';
import { SidenavComponent } from './components/pages/sidenav/sidenav.component';
import { PersonalComponent } from './components/pages/personal/personal.component';

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Mobiliario', component: MobiliarioComponent},
  {path: 'Hardware', component: HardwareComponent},
  {path: 'Comunicacion', component: ComunicacionComponent},
  {path: 'Accesorios', component: AccesoriosComponent},
  {path: 'Limpieza', component: LimpiezaComponent},
  {path: 'Papeleria', component: PapeleriaComponent},
  {path: 'Insumos', component: InsumosComponent},
  {path: 'Side', component: SidenavComponent},
  {path: 'Personal', component: PersonalComponent},

  {path: '**', pathMatch: 'full', redirectTo: 'Login'}

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
