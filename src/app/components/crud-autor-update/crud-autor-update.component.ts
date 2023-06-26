import { Component,Inject } from '@angular/core';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Autor } from '../../models/autor.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AutorService } from '../../services/autor.service';
import { UtilService } from '../../services/util.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-autor-update',
  templateUrl: './crud-autor-update.component.html',
  styleUrls: ['./crud-autor-update.component.css']
})
export class CrudAutorUpdateComponent {





  lstPais: Pais[] = [];
  lstGrado: DataCatalogo[] = [];



  objAutor: Autor = {
    idAutor:0,
    nombres:"",
    apellidos:"",
    telefono:"",
    estado:1,
    pais: {
      idPais: -1
    },
    grado: {
      idDataCatalogo: -1
    }
  };


  formsActualiza = this.formBuilder.group({
    validaNombre: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    validaApellidos: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    validaTelefono: ['', [Validators.required,Validators.pattern('[0-9]{9}')]],
    validaPais: ['', [Validators.min(1)]],
    validaGrado: ['', [Validators.min(1)]],
    validaFecha: ['', [Validators.required]],
    validaEstado: ['', [Validators.min(0)]],
  });




  constructor(public dialogRef: MatDialogRef<CrudAutorUpdateComponent>,
    private formBuilder: FormBuilder,
   /*  private docenteService:DocenteService, 
    private ubigeoService:UbigeoService, */
    private autorService: AutorService,
    private UtilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
/* this.ubigeoService.listarDepartamento().subscribe(
  response => this.departamentos = response
);   */ 
this.objAutor = data;    
this.UtilService.listaPais().subscribe( x => this.lstPais = x );
this.UtilService.listaGradoAutor().subscribe( x => this.lstGrado = x );         
}




onNoClick(): void {
  this.dialogRef.close();
}





actualiza(){
/*   console.log(">>> actualiza  >> ");
  console.log(">>> idDocente >> " + this.docente.idDocente);
  console.log(">>> nombre >>  " + this.docente.nombre);
  console.log(">>> dni >>  " + this.docente.dni);
  console.log(">>> estado >>  " + this.docente.estado);
  console.log(">>> idUbigeo >>  " + this.docente.ubigeo?.idUbigeo);
  console.log(">>> departamento >>  " + this.docente.ubigeo?.departamento);
  console.log(">>> provincia >>  " + this.docente.ubigeo?.provincia);
  console.log(">>> distrito >>  " + this.docente.ubigeo?.distrito); */

  if (this.formsActualiza.valid){
      this.autorService.actualiza(this.objAutor).subscribe(
            x => { 
              Swal.fire('Mensaje', x.mensaje, 'info'); 
            }   
      );
    }
}



















}
