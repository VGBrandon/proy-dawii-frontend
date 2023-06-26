import { Component, OnInit } from '@angular/core';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
import { Validators, FormBuilder } from "@angular/forms";



@Component({
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.css']
})

export class AgregarLibroComponent implements OnInit {
  categoria:DataCatalogo[]=[];
  tipolibro:DataCatalogo[]=[];
  libro: Libro ={
    categoriaLibro:{
      idDataCatalogo:-1
    },
    tipoLibro:{
      idDataCatalogo:-1
    }
  }
//categoria,titulo,anio,serie,tipolibro
formRegistra= this.formBuilder.group({
  titulo: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,30}')] ],
  anio: ['', [Validators.required, Validators.min(1994), Validators.max(2099), Validators.pattern('[0-9]{4}')]],
  serie: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2}[0-9]{10}')]],
  categoria: ['', [Validators.min(0)]],
  tipolibro: ['', [Validators.min(0)]],
  
  
});
  constructor(private formBuilder: FormBuilder,private LibroService:LibroService, private utilService: UtilService) { 
    this.utilService.listaTipoLibroRevista().subscribe(x=>{
      this.tipolibro=x;
    })
    this.utilService.listaCategoriaDeLibro().subscribe(x=>{
      this.categoria=x;
    })
  }
  /*
  insertado(){
    this.LibroService.insertaLibro(this.libro).subscribe(
      x=>{
        Swal.fire({
          icon:'info',
          title:"Resultado de Registro",
          text: x.mensaje,
        })
      }
    )

  }*/



insertado(){
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
              this.LibroService.insertaLibro(this.libro).subscribe(
                    x  =>   Swal.fire('Mensaje',x.mensaje,'success')
              );
        }
  })
}





























  ngOnInit(): void {
  }
 
}
