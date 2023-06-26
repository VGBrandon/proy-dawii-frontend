import { DataCatalogo } from "./dataCatalogo.model";
import { Pais } from './pais.model';



export class Proveedor {

    idProveedor?: number;
    razonsocial?: string;
    ruc?: string;
    direccion?: string;
    celular?: string;
    contacto?: string;
    estado?: number;
    fechaRegistro?: Date;
    fechaActualizacion?: Date;
    pais?:Pais;
    tipoProveedor?: DataCatalogo;
}
