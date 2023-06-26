import { Grado } from "./grado.model";
import { Pais } from './pais.model';
import { DataCatalogo } from './dataCatalogo.model';

export class Autor {

	idAutor?:number;
	nombres?:string;
    apellidos?:string;
    fechaNacimiento?:Date;
    telefono?:string;
    fechaRegistro?:Date;
    fechaActualizacion?:Date;
    estado?:number;
    pais?:Pais;
   // idGrado?:Grado;
    grado?:DataCatalogo;
    





}
