import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Vehiculos } from "../interfaces/vehiculos";
// import { enviroment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class VehiculosService {
  public urlApi = "https://swapi.py4e.com/api/vehicles/";
  constructor(private httpClient: HttpClient) {}

  getAllVehiculos(idpage: number): Observable<Vehiculos[]> {
    if (!idpage) {
      return this.httpClient.get<Vehiculos[]>(`${this.urlApi}`);
    } else {
      return this.httpClient.get<Vehiculos[]>(`${this.urlApi}?page=${idpage}`);
    }
  }
}
