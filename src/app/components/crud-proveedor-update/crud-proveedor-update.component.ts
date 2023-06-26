import { Component,Inject } from '@angular/core';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crud-proveedor-update',
  templateUrl: './crud-proveedor-update.component.html',
  styleUrls: ['./crud-proveedor-update.component.css']
})
export class CrudProveedorUpdateComponent {


  lstPais: Pais[] = [];
  lstProveedor: DataCatalogo[] = [];



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


  formsActualiza = this.formBuilder.group({
    validaRazonSocial: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    validaRuc:   ['', [Validators.required,Validators.pattern('[0-9]{11}')]],
    validaDireccion: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    validaCelular:['', [Validators.required,Validators.pattern('[0-9]{9}')]],
    validaContacto: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,20}')]],
    validaPais: ['', [Validators.min(1)]],
    validaTipoProveedor: ['', [Validators.min(1)]],
    validaEstado: ['', [Validators.min(0)]],
  });




  constructor(public dialogRef: MatDialogRef<CrudProveedorUpdateComponent>,
    private formBuilder: FormBuilder,
   /*  private docenteService:DocenteService, 
    private ubigeoService:UbigeoService, */
    private proveedorService: ProveedorService,
    private UtilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
/* this.ubigeoService.listarDepartamento().subscribe(
  response => this.departamentos = response
);   */ 
this.objProveedor = data;    
this.UtilService.listaPais().subscribe( x => this.lstPais = x );
this.UtilService.listaTipoProveedor().subscribe( x => this.lstProveedor = x );         
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
      this.proveedorService.actualizar(this.objProveedor).subscribe(
            x => { 
              Swal.fire('Mensaje', x.mensaje, 'info'); 
            }   
      );
    }
}



















}
