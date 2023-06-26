import { Component,Inject } from '@angular/core';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Libro } from 'src/app/models/libro.model';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LibroService } from 'src/app/services/libro.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crud-libro-update',
  templateUrl: './crud-libro-update.component.html',
  styleUrls: ['./crud-libro-update.component.css']
})
export class CrudLibroUpdateComponent {
  categoria:DataCatalogo[]=[];
  tipolibro:DataCatalogo[]=[];
  
  
  
  libro: Libro ={
    idLibro:0,
    titulo:"",
    anio:0,
    serie: "",
    estado:1,
    categoriaLibro:{
      idDataCatalogo:-1
    },
    tipoLibro:{
      idDataCatalogo:-1
    }
  }
  constructor(public dialogRef: MatDialogRef<CrudLibroUpdateComponent>,
    private formBuilder: FormBuilder,
    private libroService: LibroService,
    private UtilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        this.libro = data;    
        this.UtilService.listaCategoriaDeLibro().subscribe( x => this.categoria = x );
        this.UtilService.listaTipoLibroRevista().subscribe( x => this.tipolibro = x );         
        }

  formActualiza= this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,30}')] ],
    anio: ['', [Validators.required, Validators.min(1994), Validators.max(2099), Validators.pattern('[0-9]{4}')]],
    serie: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2}[0-9]{10}')]],
    categoria: ['', [Validators.min(0)]],
    tipolibro: ['', [Validators.min(0)]],
    estado: ['', [Validators.min(0)]],
    
    
  });
  actualiza(){
   
      if (this.formActualiza.valid){
          this.libroService.actualizar(this.libro).subscribe(
                x => { 
                  Swal.fire('Mensaje', x.mensaje, 'info'); 
                }   
          );
        }
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

















}
