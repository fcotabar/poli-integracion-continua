import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { PersonasComponent } from './personas/personas.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { PlanetasComponent } from './planetas/planetas.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { EspeciesComponent } from './especies/especies.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { NavesComponent } from './naves/naves.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {ManejoErroresService} from './manejoErrores/manejo-errores.service';



@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    MenuComponent,
    PlanetasComponent,
    PeliculasComponent,
    EspeciesComponent,
    VehiculosComponent,
    NavesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([  ]),
    HttpClientModule,
    SweetAlert2Module
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ManejoErroresService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
