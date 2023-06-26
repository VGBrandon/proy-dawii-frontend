import { Component, OnInit } from '@angular/core';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Sala } from 'src/app/models/sala.model';
import { SalaService } from 'src/app/services/sala.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-agregar-sala',
  templateUrl: './agregar-sala.component.html',
  styleUrls: ['./agregar-sala.component.css']
})
export class AgregarSalaComponent implements OnInit {
  lstsede:DataCatalogo[]=[];
  lstsala: DataCatalogo[] = [];

  objSala: Sala = {
    idSala:0,
    numero:"",
    piso:"",
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

  constructor(
    private formBuilder: FormBuilder,
    private salaService: SalaService,
    private UtilService: UtilService
    ) {

this.UtilService.listaSede().subscribe( x => this.lstsede = x );
this.UtilService.listaTipoSala().subscribe( x => this.lstsala = x );          
}
    


    insertado(){
      this.salaService.insertaSala(this.objSala).subscribe(
        x=>{
          Swal.fire({
            icon:'info',
            title:"Resultado de Registro",
            text: x.mensaje,
          })
        },
      );
    }
  ngOnInit(): void {
  }

}
