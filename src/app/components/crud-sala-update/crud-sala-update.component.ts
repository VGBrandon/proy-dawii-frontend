import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SalaService } from 'src/app/services/sala.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sala } from 'src/app/models/sala.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/services/util.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { CrudSalaAddComponent } from '../crud-sala-add/crud-sala-add.component';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-sala-update',
  templateUrl: './crud-sala-update.component.html',
  styleUrls: ['./crud-sala-update.component.css']
})
export class CrudSalaUpdateComponent {

  lstsede:DataCatalogo[]=[];
  lstsala: DataCatalogo[] = [];



  objSala: Sala = {
    idSala:0,
    numero:"",
    piso:"",
    numAlumnos:1,
    recursos:"",
    estado:1,
    tipoSala: {
      idDataCatalogo: -1
    },
    sede: {
      idDataCatalogo: -1
    }
  };


  formsActualiza = this.formBuilder.group({
    validaNumero: ['', [Validators.required, Validators.pattern(/^.{1,50}$/)]],//lo mismo, no se pone ""
    validaPiso: ['', [Validators.required, Validators.pattern('^([1-9]|[1-4][0-9]|50)$')]],
    validaNumAlumnos: ['', [Validators.required, Validators.pattern('^([1-9]|[1-4][0-9]|50)$')]],
    validaRecursos: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}$/)]],
    validaTipoSala: ['', [Validators.min(1)]],
    validaSede: ['', [Validators.min(1)]],
    validaEstado: ['', [Validators.min(0)]],
  });




  constructor(public dialogRef: MatDialogRef<CrudSalaUpdateComponent>,
    private formBuilder: FormBuilder,
    private salaService: SalaService,
    private UtilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

this.objSala = data;    
this.UtilService.listaSede().subscribe( x => this.lstsede = x );
this.UtilService.listaTipoSala().subscribe( x => this.lstsala = x );          
}




onNoClick(): void {
  this.dialogRef.close();
}






actualiza(){
  if (this.formsActualiza.valid){
      this.salaService.actualiza(this.objSala).subscribe(
            x => { 
              Swal.fire('Mensaje', x.mensaje, 'info'); 
            }   
      );
    }
}



















}
