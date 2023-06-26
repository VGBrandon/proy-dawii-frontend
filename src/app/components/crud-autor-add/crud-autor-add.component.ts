import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Autor } from '../../models/autor.model';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2'
import { UtilService } from '../../services/util.service';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-crud-autor-add',
  templateUrl: './crud-autor-add.component.html',
  styleUrls: ['./crud-autor-add.component.css']
})
export class CrudAutorAddComponent  {






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


  formsRegistra = this.formBuilder.group({
    validaNombre: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    validaApellidos: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    validaTelefono: ['', [Validators.required,Validators.pattern('[0-9]{9}')]],
    validaPais: ['', [Validators.min(1)]],
    validaGrado: ['', [Validators.min(1)]],
    validaFecha: ['', [Validators.required]],

  /*   validaDni: ['', [Validators.required,Validators.pattern('[0-9]{8}')]],
    validaDepartamento: ['', [Validators.min(1)]],
    validaProvincia: ['', [Validators.min(1)]],
    validaDistrito: ['', [Validators.min(1)]] */
  });

  constructor(public dialogRef: MatDialogRef<CrudAutorAddComponent>,
    private formBuilder: FormBuilder,
   /*  private docenteService:DocenteService, 
    private ubigeoService:UbigeoService, */
    private autorService: AutorService,
    private UtilService: UtilService
    ) {
/* this.ubigeoService.listarDepartamento().subscribe(
  response => this.departamentos = response
);   */ 
this.UtilService.listaPais().subscribe( x => this.lstPais = x );
this.UtilService.listaGradoAutor().subscribe( x => this.lstGrado = x );         
}



onNoClick(): void {
  this.dialogRef.close();
}




registra(){
  debugger
     
          if (this.formsRegistra.valid){
            
                this.autorService.insertaAutor(this.objAutor).subscribe(
                      x => { 
                              //  Swal.fire('Mensaje', x.errores, 'info'); 
                                Swal.fire({ icon: 'info', title: "Resultado de Registro", text: x.errores });
                                console.log(x);
                                this.objAutor = { 
                                  idAutor: 0,
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
                            }   
                );
          }
     }
     









}
