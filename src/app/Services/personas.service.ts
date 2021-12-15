import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Personas } from "../interfaces/personas";

@Injectable({
  providedIn: "root",
})
export class PersonasService {
  public urlApi = "https://swapi.py4e.com/api/people/";

  constructor(private httpClient: HttpClient) {}

  getAllPersonas(idPage: number): Observable<Personas[]> {
    if (!idPage) {
      return this.httpClient.get<Personas[]>(`${this.urlApi}`);
    } else {
      return this.httpClient.get<Personas[]>(`${this.urlApi}?page=${idPage}`);
    }
  }
}
