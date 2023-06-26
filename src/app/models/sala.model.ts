import { DataCatalogo } from "./dataCatalogo.model";

export class Sala {

    idSala?: number;
    numero?: string;
    piso?: string;
    numAlumnos?: number;
    recursos?: string;
    fechaRegistro?: Date;
    fechaActualizacion?: Date;
    estado?: number;
    tipoSala?: DataCatalogo;
    sede?: DataCatalogo;
}
