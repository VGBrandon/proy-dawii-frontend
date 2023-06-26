import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, AbstractControl, ValidationErrors  } from "@angular/forms";

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css']
})
export class AgregarAlumnoComponent implements OnInit {

  paises: Pais[] = [];
  modalidades: DataCatalogo[] = [];
  alumno: Alumno ={
    pais:{
      idPais:-1
    },
    modalidad:{
      idDataCatalogo:-1
    }
  }

  constructor(private formBuilder: FormBuilder, private alumnoService:AlumnoService, private utilService: UtilService) {
    this.utilService.listaPais().subscribe(x=>{
      this.paises=x;
    });

    this.utilService.listaModalidadAlumno().subscribe(x=>{
      this.modalidades=x;
    });
   }

  formRegistra= this.formBuilder.group({
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
      return { fechaInvalida: true };
    }
    return null;
  }

  registraAlumno(){
        Swal.fire({
          title: '¿Desea Registrar?',
          text: "Revise bien los campos",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, Registra.',
          cancelButtonText: 'No, cancelar'
      },
    ).then((result) => {
      if (result.isConfirmed) {
            this.alumnoService.insertaAlumno(this.alumno).subscribe(
                  x  =>   Swal.fire('Mensaje',x.mensaje,'success')
            );
      }
    })
  }

  ngOnInit(): void {
  }

}
