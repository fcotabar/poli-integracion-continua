import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Peliculas } from "../interfaces/peliculas";
// import { enviroment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class PeliculasService {
  constructor(private httpClient: HttpClient) {}

  getAllPeliculas(): Observable<Peliculas[]> {
    return this.httpClient.get<Peliculas[]>(
      "https://swapi.py4e.com/api/films/"
    );
  }
}
