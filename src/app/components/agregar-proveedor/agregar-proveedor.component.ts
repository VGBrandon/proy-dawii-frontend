import { Component, OnInit } from '@angular/core';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import Swal from 'sweetalert2';
import { ProveedorService } from '../../services/proveedor.service';
import { Validators, FormBuilder} from "@angular/forms";
import { Proveedor } from '../../models/proveedor.model';
import { UtilService } from '../../services/util.service';
import { Pais } from '../../models/pais.model';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {

  lstPais: Pais[] = [];
  tipoproveedor:DataCatalogo[]=[];
  
  objProveedor: Proveedor = {
    idProveedor:0,
    razonsocial:"",
    ruc:"",
    direccion:"",
    celular:"",
    contacto:"",
    estado:1,
    pais: {
      idPais: -1
    },
    tipoProveedor: {
      idDataCatalogo: -1
    }
  };


//categoria,titulo,anio,serie,tipolibro
  formRegistra= this.formBuilder.group({
  razonsocial: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,30}')] ],
  ruc: ['', [Validators.required,Validators.pattern('[0-9]{11}')]],
  direccion: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,30}')] ],
  celular: ['', [Validators.required,Validators.pattern('[0-9]{9}')]],
  contacto: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,20}')] ],
  validaPais: ['', [Validators.min(0)]],
  tipoproveedor: ['', [Validators.min(0)]],
  
  
});


  constructor(private formBuilder: FormBuilder,private ProveedorService:ProveedorService, private utilService: UtilService) {
    
    this.utilService.listaPais().subscribe( x => this.lstPais = x );
    this.utilService.listaTipoProveedor().subscribe(x=>{ this.tipoproveedor=x;})
  }



  


registraProveedor(){
  debugger
     
          if (this.formRegistra.valid){
            
                this.ProveedorService.insertaProveedor(this.objProveedor).subscribe(
                      x => { 
                              //Swal.fire('Mensaje', x.errores, 'info'); 
                                Swal.fire({ icon: 'success', title: "Registro Proveedor Exitoso", text: x.errores });
                                console.log(x);
                                this.objProveedor = { 
                                  idProveedor: 0,
                                  razonsocial:"",
                                  ruc:"",
                                  direccion:"",
                                  celular:"",
                                  contacto:"",
                                  estado:1,
                                  pais: {
                                    idPais: -1
                                  },
                                  tipoProveedor: {
                                    idDataCatalogo: -1
                                  }
                                }; 
                            }   
                );
          }
     }

     ngOnInit(): void {
    }
}
