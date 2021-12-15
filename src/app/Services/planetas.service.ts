import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Planetas } from "../interfaces/planetas";
// import { enviroment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class PlanetasService {
  public urlApi = "https://swapi.py4e.com/api/planets/";

  constructor(private httpClient: HttpClient) {}

  getAllPlanetas(idPage: number): Observable<Planetas[]> {
    if (!idPage) {
      return this.httpClient.get<Planetas[]>(`${this.urlApi}`);
    } else {
      return this.httpClient.get<Planetas[]>(`${this.urlApi}?page=${idPage}`);
    }
  }
}
