import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Autor } from '../models/autor.model';
import {  Observable } from 'rxjs';

const baseUrlAutor = AppSettings.API_ENDPOINT+ '/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

 
  constructor(private http : HttpClient) { }

  
  insertaAutor(obj : Autor ): Observable<any>{
    debugger
    return this.http.post(baseUrlAutor,obj);

  }


    listaAutor(nombres:string,  idPais: string, estado:number): Observable<any>{

      const params = new HttpParams().set("nombre", nombres).set("idPais", idPais).set("estado", estado);  
      return this.http.get(baseUrlAutor + "/listaAutorConParametros", {params});

    }




    elimina(idAutor:number):Observable<any>{
      return this.http.delete(baseUrlAutor + "/eliminaAutor/"+ idAutor);
  }



  actualiza(obj:Autor):Observable<any>{
    return this.http.put(baseUrlAutor + "/actualizaAutor", obj);
}





consultaPorNombre(filtro:string):Observable<Autor[]>{
  return  this.http.get<Autor[]>(baseUrlAutor +"/listaAutorPorNombreLike/"+filtro); 
}  


















}
