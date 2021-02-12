import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import {HttpClient, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

// componentes
import {LoginComponent} from './components/Login/login.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/pages/navbar/navbar.component';
import { MobiliarioComponent } from './components/pages/mobiliario/mobiliario.component';
import { HardwareComponent } from './components/pages/hardware/hardware.component';
import { ComunicacionComponent } from './components/pages/comunicacion/comunicacion.component';
import { AccesoriosComponent } from './components/pages/acccesorios/accesorios.component';
import { LimpiezaComponent } from './components/pages/limpieza/limpieza.component';
import { PapeleriaComponent } from './components/pages/papeleria/papeleria.component';
import { InsumosComponent } from './components/pages/insumos/insumos.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { SidenavComponent } from './components/pages/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonalComponent } from './components/pages/personal/personal.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    MobiliarioComponent,
    HardwareComponent,
    ComunicacionComponent,
    AccesoriosComponent,
    LimpiezaComponent,
    PapeleriaComponent,
    InsumosComponent,
    SidenavComponent,
    PersonalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ChartsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    HttpClientModule,
    LayoutModule,
    MatSliderModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
