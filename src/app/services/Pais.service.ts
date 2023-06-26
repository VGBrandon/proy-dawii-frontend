import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Autor } from '../models/autor.model';
import { observable, Observable } from 'rxjs';
import { Pais } from '../models/pais.model';

const baseUrlAutor = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
  providedIn: 'root'
})
export class PaisService {



    constructor(private http: HttpClient) {}

    listarPAis(): Observable<Pais[]> {
      return this.http.get<Pais[]>(baseUrlAutor + '/listaPais');
    }


 /*    getTipoMoneda(): Observable<moneda[]> {
      return this.http.get<moneda[]>(this.apiURL + '/monedas');
    } */

}