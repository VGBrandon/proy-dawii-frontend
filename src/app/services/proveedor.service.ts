import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Proveedor } from '../models/proveedor.model';
import { Observable } from 'rxjs';

const baseUrlProveedor = AppSettings.API_ENDPOINT+ '/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {


  constructor(private http : HttpClient) { }


  insertaProveedor(obj : Proveedor ): Observable<any>{
    debugger
    return this.http.post(baseUrlProveedor,obj);

  }


     listaProveedor(razonsocial:string,  idPais: string, estado:number): Observable<any>{

      const params = new HttpParams().set("razonsocial", razonsocial).set("idPais", idPais).set("estado", estado);  
      return this.http.get(baseUrlProveedor + "/listaProveedorConParametros", {params});

    }

    
  eliminar(idProveedor:number):Observable<any>{
    return this.http.delete(baseUrlProveedor + "/eliminaProveedor/"+ idProveedor);
  }

  actualizar(obj:Proveedor):Observable<any>{
    return this.http.put(baseUrlProveedor + "/actualizaProveedor",obj);
  }
  consultaporrazonsocial(filtro:string):Observable<any>{
    return this.http.get(baseUrlProveedor + "/listaProveedorPorNombre/"+filtro);
  }






}
