import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Naves } from "../interfaces/naves";
// import { enviroment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class NavesService {
  public urlApi = "https://swapi.py4e.com/api/starships/";
  constructor(private httpClient: HttpClient) {}

  getAllNaves(idpage: number): Observable<Naves[]> {
    if (!idpage) {
      return this.httpClient.get<Naves[]>(`${this.urlApi}`);
    } else {
      return this.httpClient.get<Naves[]>(`${this.urlApi}?page=${idpage}`);
    }
  }
}
