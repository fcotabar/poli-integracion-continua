import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { VehiculosService } from '../Services/vehiculos.service';
import { Vehiculos} from '../interfaces/vehiculos';
import * as moment from 'moment';
import { AgGridAngular } from 'ag-grid-angular';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  public defaultColDef;

  constructor( private _location: Location, private router: Router, private vehiculosService: VehiculosService ) {
    this.defaultColDef = { resizable: true, sortable: true, filter: true };
  }
  
  vehiculos: Vehiculos[];
  rowData: any;
  errorApi: string;

  // @ts-ignore
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    {headerName: 'Nombre', width: 180,  field:  'name' },
    {headerName: 'Modelo', width: 190, field: 'model'},
    {headerName: 'Clase Vehiculo', width: 190, field: 'vehicle_class'},
    {headerName: 'Fabricante', width: 340,  field: 'manufacturer'},
    {headerName: 'Longitud', width: 90,  field: 'length'},
    {headerName: 'Costo en creditos', width: 140,  field: 'cost_in_credits'},
    {headerName: 'Personal', width: 90,  field: 'crew'},
    {headerName: 'Pasajeros', width: 100,  field: 'passengers'},
    {headerName: 'Velocidad maxima de atmosfera', width: 220,  field: 'max_atmosphering_speed'},
    {headerName: 'Capacidad de carga', width: 150,  field: 'cargo_capacity'},
    {headerName: 'Consumibles', width: 110,  field: 'consumables'},
    {headerName: 'Peliculas', width: 490,  field: 'films'},
    {headerName: 'Pilotos', width: 370,  field: 'pilots'},
    {headerName: 'Creado', width: 130,  field: 'created', sortable: true, filter: true, valueFormatter(params) {
      return moment (params.value).format ('DD MMM, YYYY hh:mm'); }
      },
    {headerName: 'Ubicación', field: 'url', sortable: true, filter: true },
    {headerName: 'Editado', width: 130, field: 'edited', sortable: true, filter: true,  valueFormatter(params) {
      return moment (params.value).format ('DD MMM, YYYY hh:mm'); }
      },
  ];

  ngOnInit() {
    this.getAllVehiculos( null );
  }
  getAllVehiculos( idpage: number ) {
    this.vehiculosService.getAllVehiculos( idpage ).pipe(
      catchError(err => this.errorApi = err) // Enviamos el catch al servicio  de Manejo de errores
    ).subscribe(resp => {
      this.rowData = resp;
      if (resp === 222) { // si la respuesta del catch es un error , hacemos una redirección al menú principal
        this.router.navigate(['/menu']);
      }
    });
  }

  back() {
    this._location.back();
  }
}
