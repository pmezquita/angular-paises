import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, of, tap} from "rxjs";
import {Country} from "../interfaces/pais.interface";
import {CacheStore} from "../interfaces/cache-store.interface";
import {Region} from "../interfaces/region.type";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private params: HttpParams = new HttpParams().set(
    'fields', 'name,flags,flag,population,cca2'
  );

  cacheStore: CacheStore = {
    byCapital: {term: '', paises: []},
    byPais: {term: '', paises: []},
    byRegion: {region: '', paises: []}
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('paisesCache', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('paisesCache')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('paisesCache')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(
      url,
      {params: this.params}
    ).pipe(
      catchError(() => of([])),
      delay(200)
    );
  }

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byPais = {term: termino, paises: countries}),
        tap(() => this.saveToLocalStorage()),
      );
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term: termino, paises: countries}),
        tap(() => this.saveToLocalStorage()),
      );
  }

  getPaisPorCode(code: string): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  buscarRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region, paises: countries}),
        tap(() => this.saveToLocalStorage()),
      );
  }

}
