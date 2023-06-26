import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Libro } from '../models/libro.model';
import { Observable } from 'rxjs';

const baseUrlLibro = AppSettings.API_ENDPOINT+ '/libro';
//const baseUrl = "http://localhost:4200/url/libro";

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  

  constructor(private http: HttpClient ) { }

  insertaLibro(data:Libro): Observable<any>{
    return this.http.post(baseUrlLibro, data);
  }

  listaLibro(titulo:string,  idCategoriaLibro: number,idTipoLibro: number): Observable<any>{

    const params = new HttpParams().set("titulo", titulo).set("idCategoriaLibro", idCategoriaLibro).set("idTipoLibro", idTipoLibro)/*.set("estado", estado)*/;  
    return this.http.get(baseUrlLibro + "/listaLibroConParametros", {params});

  }

  eliminar(idLibro:number):Observable<any>{
    return this.http.delete(baseUrlLibro + "/eliminaLibro/"+ idLibro);
  }

  actualizar(obj:Libro):Observable<any>{
    return this.http.put(baseUrlLibro + "/actualizaLibro",obj);
  }
  consultaportitulo(filtro:string):Observable<any>{
    return this.http.get(baseUrlLibro + "/listaLibroPorNombre/"+filtro);
  }





}
