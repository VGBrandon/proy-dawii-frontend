import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Validators, FormBuilder } from "@angular/forms";
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilService } from 'src/app/services/util.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-proveedor-add',
  templateUrl: './crud-proveedor-add.component.html',
  styleUrls: ['./crud-proveedor-add.component.css']
})
export class CrudProveedorAddComponent {
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
constructor(public dialogRef: MatDialogRef<CrudProveedorAddComponent>,
  private formBuilder: FormBuilder,
  private proveedorService: ProveedorService,
  private UtilService: UtilService
  ) {
this.UtilService.listaPais().subscribe( x => this.lstPais = x );
this.UtilService.listaTipoProveedor().subscribe( x => this.tipoproveedor = x );         
}


onNoClick(): void {
  this.dialogRef.close();
}
 

registra(){
  debugger
     
          if (this.formRegistra.valid){
            
                this.proveedorService.insertaProveedor(this.objProveedor).subscribe(
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


}

