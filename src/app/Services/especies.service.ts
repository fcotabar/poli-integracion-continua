import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Especies } from "../interfaces/especies";
// import { enviroment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class EspeciesService {
  public urlApi = "https://swapi.py4e.com/api/species/";

  constructor(private httpClient: HttpClient) {}

  getAllEspecies(idPage: number): Observable<Especies[]> {
    if (!idPage) {
      return this.httpClient.get<Especies[]>(`${this.urlApi}`);
    } else {
      return this.httpClient.get<Especies[]>(`${this.urlApi}?page=${idPage}`);
    }
  }
}
