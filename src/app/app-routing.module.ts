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
import { CanActivateViaAuthGuardGuard } from './services/guards/can-activate-via-auth-guard.guard';

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Dashboard', component: DashboardComponent, canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'Mobiliario', component: MobiliarioComponent, canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'Hardware', component: HardwareComponent, canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'Comunicacion', component: ComunicacionComponent, canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'Accesorios', component: AccesoriosComponent, canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'Limpieza', component: LimpiezaComponent, canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'Papeleria', component: PapeleriaComponent, canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'Insumos', component: InsumosComponent, canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'Side', component: SidenavComponent, canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'Personal', component: PersonalComponent, canActivate: [CanActivateViaAuthGuardGuard] },

  {path: '**', pathMatch: 'full', redirectTo: 'Login'}

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
