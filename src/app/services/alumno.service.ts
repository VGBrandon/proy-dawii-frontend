import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alumno } from '../models/alumno.model';
import { Observable } from 'rxjs';

const baseUrlAlumno = AppSettings.API_ENDPOINT+ '/alumno';
const baseUrlAlumno2 = AppSettings.API_ENDPOINT+ '/util';
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http:HttpClient) { }

  insertaAlumno(obj:Alumno): Observable<any>{
    return this.http.post(baseUrlAlumno, obj);
  }

  listaAlumnoNombres(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(baseUrlAlumno2 + '/listaAlumno');
  }


  listaAlumno(nombres:string,  idPais: string, idModalidad:string): Observable<any>{
    const params = new HttpParams().set("nombres", nombres).set("idPais", idPais).set("idModalidad", idModalidad);
    return this.http.get(baseUrlAlumno + "/listaAlumnoConParametros", {params});
  }

  consultaPorNombre(filtro:string):Observable<Alumno[]>{
    return this.http.get<Alumno[]>(baseUrlAlumno + "/listaAlumnoPorNombre/"+filtro);
  }

  eliminar(idAlumno:number):Observable<any>{
    return this.http.delete(baseUrlAlumno + "/eliminaAlumno/"+ idAlumno);
  }

  actualizar(obj:Alumno):Observable<any>{
    return this.http.put(baseUrlAlumno + "/actualizaAlumno",obj);
  }

}
