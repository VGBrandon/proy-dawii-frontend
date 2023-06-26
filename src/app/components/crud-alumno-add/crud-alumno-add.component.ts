import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, AbstractControl, ValidationErrors } from "@angular/forms";
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UtilService } from 'src/app/services/util.service';
import { Pais } from 'src/app/models/pais.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-alumno-add',
  templateUrl: './crud-alumno-add.component.html',
  styleUrls: ['./crud-alumno-add.component.css']
})
export class CrudAlumnoAddComponent {
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


  formRegistra = this.formBuilder.group({
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

  constructor(public dialogRef: MatDialogRef<CrudAlumnoAddComponent>,private formBuilder: FormBuilder,private AlumnoService:AlumnoService, private utilService: UtilService) {
    this.utilService.listaPais().subscribe(x=>{
      this.paises=x;
    })
    this.utilService.listaModalidadAlumno().subscribe(x=>{
      this.modalidades=x;
    })
  }

registra(){
  Swal.fire({
    title: '¿Desea Registrar?',
    text: "Revise bien los campos",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Registra.',
    cancelButtonText: 'No, cancelar'
  }).then((result) => {
        if (result.isConfirmed) {
              this.AlumnoService.insertaAlumno(this.Alumno).subscribe(
                    x  =>   Swal.fire('Mensaje',x.mensaje,'success')
              );
        }
  })
}

cancelar():void{
  this.dialogRef.close();
}


}
