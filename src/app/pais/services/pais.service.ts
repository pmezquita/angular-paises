import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country} from "../interfaces/pais.interface";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private params: HttpParams = new HttpParams().set(
    'fields', 'name,flags,flag,population,cca2'
  );

  constructor(private http: HttpClient) {
  }

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;

    return this.http.get<Country[]>(
      url,
      {params: this.params}
    );
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;

    return this.http.get<Country[]>(
      url,
      {params: this.params}
    );
  }

  getPaisPorCode(code: string): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url);
  }

  buscarRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;

    return this.http.get<Country[]>(
      url,
      {params: this.params}
    );
  }

}
