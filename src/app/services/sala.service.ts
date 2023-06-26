import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Sala } from '../models/sala.model';
import { Observable, map } from 'rxjs';

const baseUrlSala = AppSettings.API_ENDPOINT+ '/sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http: HttpClient) { }


  insertaSala(data:Sala): Observable<any>{
      return this.http.post(baseUrlSala, data);
  }

  listarSalas(){
    return this.http.get(`${baseUrlSala}`,{
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>)=>{
      const body = response.body;
      return body;
    }))
  }


  listaSala(numero:string, piso:string, idSesde:number):Observable<any> {
    const params = new HttpParams().set("numero", numero).set("piso", piso).set("idSesde", idSesde);
    return this.http.get<any>(baseUrlSala + "/listaSalaConParametros", {params});
  }

  elimina(idSala:number):Observable<any>{
    return this.http.delete(baseUrlSala + "/eliminaSala/"+ idSala);
}



actualiza(obj:Sala):Observable<any>{
  return this.http.put(baseUrlSala + "/actualizaSala", obj);
}





consultaPorNumero(filtro:string):Observable<Sala[]>{
return  this.http.get<Sala[]>(baseUrlSala +"/listaSalaPorNumeroLike/"+filtro); 
}  

}
