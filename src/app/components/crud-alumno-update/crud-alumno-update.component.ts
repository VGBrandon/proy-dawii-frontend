import { Component,Inject } from '@angular/core';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Alumno } from '../../models/alumno.model';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { UtilService } from '../../services/util.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-alumno-update',
  templateUrl: './crud-alumno-update.component.html',
  styleUrls: ['./crud-alumno-update.component.css']
})
export class CrudAlumnoUpdateComponent {

  paises: Pais[] = [];
  modalidades: DataCatalogo[] = [];

  Alumno: Alumno = {
    pais: {
      idPais: -1
    },
    modalidad: {
      idDataCatalogo: -1
    }
  };


  formActualiza = this.formBuilder.group({
    nombres: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,30}')] ],
    apellidos: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,30}')] ],
    telefono: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    dni: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    correo: ['', [Validators.required, Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]],
    fechaNacimiento: ['', [Validators.required,this.fechaNacimientoValida]],
    pais: ['', [Validators.min(0)]],
    modalidad: ['', [Validators.min(0)]],

  });

  fechaNacimientoValida(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && new Date(value) > new Date()) {
      return { pattern: true };
    }
    return null;
  }


  constructor(public dialogRef: MatDialogRef<CrudAlumnoUpdateComponent>,
    private formBuilder: FormBuilder,

    private alumnoService: AlumnoService,
    private UtilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

this.Alumno = data;
this.UtilService.listaPais().subscribe( x => this.paises = x );
this.UtilService.listaModalidadAlumno().subscribe( x => this.modalidades = x );
}




cancelar():void{
  this.dialogRef.close();
}




actualiza(){


  if (this.formActualiza.valid){
      this.alumnoService.actualizar(this.Alumno).subscribe(
            x => {
              Swal.fire('Mensaje', x.mensaje, 'info');
            }
      );
    }
}



















}
