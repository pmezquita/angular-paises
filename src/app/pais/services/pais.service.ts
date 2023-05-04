import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, of} from "rxjs";
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

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(
      url,
      {params: this.params}
    ).pipe(
      catchError(() => of([])),
      delay(1000)
    );
  }

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.getCountriesRequest(url);
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.getCountriesRequest(url);
  }

  getPaisPorCode(code: string): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  buscarRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url);
  }

}
