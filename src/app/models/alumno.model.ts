import { DataCatalogo } from "./dataCatalogo.model";
import { Pais } from "./pais.model";

export class Alumno {
  idAlumno?: number;
  nombres?: string;
  apellidos?: string;
  telefono?: string;
  dni?: string;
  correo?: string;
  fechaNacimiento?: Date;
  estado?: number;
  pais?: Pais;
  modalidad?: DataCatalogo;
}
