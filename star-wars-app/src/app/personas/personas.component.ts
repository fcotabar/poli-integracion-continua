import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {PersonasService} from '../Services/personas.service';
import {Personas} from '../interfaces/personas';
import * as moment from 'moment';
import {AgGridAngular} from 'ag-grid-angular';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  public defaultColDef;
  // tslint:disable-next-line:variable-name
  constructor(private _location: Location, private router: Router, private personasService: PersonasService) {
    this.defaultColDef = { resizable: true };
  }
  personas: Personas[];
  rowData: any;
  errorApi: string;
  // @ts-ignore
  @ViewChild('agGrid') agGrid: AgGridAngular;

  // columnDefs = [
  //   {headerName: 'Nombre', field:  'name', sortable: true , filter: true},
  //   {headerName: 'Periodo rotación', field: 'rotation_period', sortable: true, filter: true},
  //   {headerName: 'Periodo orbital', field: 'orbital_period', sortable: true, filter: true, },
  //   {headerName: 'Diametro', field: 'diameter', sortable: true, filter: true, },
  //    {headerName: 'Clima', field: 'climate', sortable: true, filter: true, },
  //   {headerName: 'Gravedad', field: 'gravity', sortable: true, filter: true },
  //   {headerName: 'Terreno', field: 'terrain', sortable: true, filter: true },
  //   {headerName: 'Superficie del agua', field: 'surface_water', sortable: true, filter: true },
  //   {headerName: 'Población', field: 'population', sortable: true, filter: true },
  //   {headerName: 'Creado', field: 'created', sortable: true, filter: true },
  //   {headerName: 'Editado', field: 'edited', sortable: true, filter: true },
  //   {headerName: 'Ubicación', field: 'url', sortable: true, filter: true },
  // ];
  columnDefs = [
    {headerName: 'Nombre', field:  'name',  sortable: true , filter: true},
    {headerName: 'Altura', width: 80 , field: 'height', sortable: true, filter: true},
    {headerName: 'Masa', width: 80 , field: 'mass', sortable: true, filter: true, },
    {headerName: 'Color cabello', width: 130 , field: 'hair_color', sortable: true, filter: true, },
    {headerName: 'Color piel', width: 100 , field: 'skin_color', sortable: true, filter: true, },
    {headerName: 'Color ojos', width: 100 , field: 'eye_color', sortable: true, filter: true },
    {headerName: 'Cumpleaños', width: 150 , field: 'birth_year', sortable: true, filter: true },
    {headerName: 'Genero', width: 110 , field: 'gender', sortable: true, filter: true },
    {headerName: 'Planeta', field: 'homeworld', sortable: true, filter: true },
    {headerName: 'Creado', width: 130,  field: 'created', sortable: true, filter: true, valueFormatter(params) {
      return moment (params.value).format ('DD MMM, YYYY hh:mm'); }
      },
    {headerName: 'Editado', width: 130, field: 'edited', sortable: true, filter: true,  valueFormatter(params) {
      return moment (params.value).format ('DD MMM, YYYY hh:mm'); }
      },
    {headerName: 'Ubicación', field: 'url', sortable: true, filter: true },
  ];
  ngOnInit() {
    this.getAllPersonas(null);
  }
  getAllPersonas(idpage: number) {
    this.personasService.getAllPersonas(idpage).pipe(
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


