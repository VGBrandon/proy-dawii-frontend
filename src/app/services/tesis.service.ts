import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrlTesis = AppSettings.API_ENDPOINT+ '/tesis';

@Injectable({
  providedIn: 'root'
})
export class TesisService {

  constructor(private http:HttpClient){ }

  listaTesis(titulo:string, tema:string, idAlumno:number):Observable<any> {
    const params = new HttpParams().set("titulo", titulo).set("tema", tema).set("idAlumno", idAlumno);
    return this.http.get<any>(baseUrlTesis + "/listaTesisConParametros", {params});
  }
}
