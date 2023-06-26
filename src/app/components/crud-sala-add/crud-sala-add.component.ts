import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SalaService } from 'src/app/services/sala.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sala } from 'src/app/models/sala.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/services/util.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { CrudSalaUpdateComponent } from '../crud-sala-update/crud-sala-update.component';

@Component({
  selector: 'app-crud-sala-add',
  templateUrl: './crud-sala-add.component.html',
  styleUrls: ['./crud-sala-add.component.css']
})
export class CrudSalaAddComponent {

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


  formsRegistra = this.formBuilder.group({
    validaNumero: ['', [Validators.required, Validators.pattern(/^.{1,50}$/)]],//lo mismo, no se pone ""
    validaPiso: ['', [Validators.required, Validators.pattern('^([1-9]|[1-4][0-9]|50)$')]],
    validaNumAlumnos: ['', [Validators.required, Validators.pattern('^([1-9]|[1-4][0-9]|50)$')]],
    validaRecursos: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}$/)]],
    validaTipoSala: ['', [Validators.min(1)]],
    validaSede: ['', [Validators.min(1)]],
  });

  constructor(public dialogRef: MatDialogRef<CrudSalaAddComponent>,
    private formBuilder: FormBuilder,
    private salaService: SalaService,
    private UtilService: UtilService
    ) {

this.UtilService.listaSede().subscribe( x => this.lstsede = x );
this.UtilService.listaTipoSala().subscribe( x => this.lstsala = x );          
}



onNoClick(): void {
  this.dialogRef.close();
}




registra(){
  debugger
     
          if (this.formsRegistra.valid){
            
                this.salaService.insertaSala(this.objSala).subscribe(
                      x => { 
                              //  Swal.fire('Mensaje', x.errores, 'info'); 
                                Swal.fire({ icon: 'info', title: "Resultado de Registro", text: x.errores });
                                console.log(x);
                                this.objSala = { 
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
                            }   
                );
          }
     }
     









}