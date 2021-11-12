import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { EspeciesService } from '../Services/especies.service';
import { Especies } from '../interfaces/especies';
import * as moment from 'moment';
import { AgGridAngular } from 'ag-grid-angular';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.css']
})
export class EspeciesComponent implements OnInit {

  public defaultColDef;

  constructor( private _location: Location, private router: Router, private especiesService: EspeciesService ) {
    this.defaultColDef = { resizable: true, sortable: true, filter: true };
  }

  especies: Especies[];
  rowData: any;
  errorApi: string;

  // @ts-ignore
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    {headerName: 'Nombre', width: 130,  field:  'name' },
    {headerName: 'Especie', width: 100, field: 'classification'},
    {headerName: 'Altura promedio', width: 140 , field: 'average_height' },
    {headerName: 'Colores de cabello', width: 150 , field: 'hair_colors' },
    {headerName: 'Colores de piel', width: 180 , field: 'skin_colors' },
    {headerName: 'Colores de ojos', width: 160 , field: 'eye_colors' },
    {headerName: 'Esperanza de vida', width: 150 , field: 'average_lifespan' },
    {headerName: 'Idioma', width: 130, field: 'language' },
    {headerName: 'Planeta', width: 210 , field: 'homeworld' },
    {headerName: 'Creado', width: 150,  field: 'created', valueFormatter(params) {
      return moment (params.value).format ('DD MMM, YYYY hh:mm'); }
      },
    {headerName: 'Editado', width: 150, field: 'edited',  valueFormatter(params) {
      return moment (params.value).format ('DD MMM, YYYY hh:mm'); }
      },
    {headerName: 'Ubicación', width: 210, field: 'url' }
  ];

  ngOnInit() {
    this.getAllEspecies( null );
  }

  getAllEspecies( idpage: number ) {
    this.especiesService.getAllEspecies( idpage ).pipe(
      catchError(err => this.errorApi = err) // Enviamos el catch al servicio  de Manejo de errores
    ).subscribe(resp => {
      this.rowData = resp;
      if (resp === 222) { // si la respuesta del catch es un error , hacemos una redirección al menú principal
        this.router.navigate(['/menu']);
      }
    });
  }

  back(){
    this._location.back();
  }

}
