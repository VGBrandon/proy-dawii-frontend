import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AutorService } from '../../services/autor.service';
import { Autor } from '../../models/autor.model';
import { UtilService } from '../../services/util.service';
import { Pais } from '../../models/pais.model';
import { Grado } from 'src/app/models/grado.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-autor',
  templateUrl: './agregar-autor.component.html',
  styleUrls: ['./agregar-autor.component.css']
})
export class AgregarAutorComponent implements OnInit {


  lstPais: Pais[] = [];
  lstGrado: DataCatalogo[] = [];

  objAutor: Autor = {
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


  constructor(private AutorService: AutorService,
    private formBuilder: FormBuilder, private UtilService: UtilService) 
  {
    this.UtilService.listaPais().subscribe( x => this.lstPais = x );
    this.UtilService.listaGradoAutor().subscribe( x => this.lstGrado = x );

  }

  ngOnInit(): void {
  }


/* 
  registra(): void {
    debugger
    this.AutorService.insertaAutor(this.objAutor).subscribe(
      x => Swal.fire({ icon: 'info', title: "Resultado de Registro", text: x.errores })
    );

  }
 */







  registra(){
debugger
   
        if (this.formsRegistra.valid){
          
              this.AutorService.insertaAutor(this.objAutor).subscribe(
                    x => { 
                            //  Swal.fire('Mensaje', x.errores, 'info'); 
                              Swal.fire({ icon: 'info', title: "Resultado de Registro", text: x.errores });
                   /*            console.log(x);
                              this.objAutor = { 
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
                              }; */
                          }   
              );
        }
   }
   
   
   





















}
