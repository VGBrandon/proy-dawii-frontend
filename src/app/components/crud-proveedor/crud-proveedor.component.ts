import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilService } from 'src/app/services/util.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pais } from 'src/app/models/pais.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { MatTableDataSource } from '@angular/material/table';
import { CrudProveedorAddComponent } from '../crud-proveedor-add/crud-proveedor-add.component';
import { CrudProveedorUpdateComponent } from '../crud-proveedor-update/crud-proveedor-update.component';

@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

  lstPais: Pais[] = [];
  tipoProveedor:DataCatalogo[]=[];

  datasource:any;
  filtro:string="";
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
   displayedColumns = ["idProveedor","razonsocial","ruc","direccion","celular","contacto","estado","categoriaPais","tipoProveedor",'actions'];


   constructor(private formBuilder: FormBuilder,  
    private dialogService: MatDialog,
    private proveedorService: ProveedorService,
     private UtilService: UtilService) { 
      this.UtilService.listaPais().subscribe( x => this.lstPais = x );
      this.UtilService.listaTipoProveedor().subscribe( x => this.tipoProveedor = x );
     }
     ngOnInit(): void {
    }



    consultaProveedor(){
      console.log(">>> consultaProveedor>>> " +  this.filtro);
      this.refreshTable();
 }
 private refreshTable() {
  this.proveedorService.consultaporrazonsocial(this.filtro==""?"todos":this.filtro).subscribe(
    x => {
      this.datasource = new MatTableDataSource<Proveedor>(x);
      this.datasource.paginator = this.paginator; 
    }
  ); 
  }

  openAddDialog() {
    console.log(">>> openAddDialog  >>");
    const dialogRef = this.dialogService.open(CrudProveedorAddComponent);
    dialogRef.afterClosed().subscribe(result => {
        console.log(">>> result >> " + result);
        if (result === 1) {
            this.refreshTable();
        }
    });
  }
  
openUpdateDialog(obj:Proveedor) {

    const dialogRef = this.dialogService.open(CrudProveedorUpdateComponent, {data:obj});
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
            this.refreshTable();
      }
    });
   
  }

  elimina(obj:Proveedor){
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
          if (result.isConfirmed) {
              this.proveedorService.eliminar(obj.idProveedor || 0).subscribe(
                    x => {
                          this.refreshTable();
                          Swal.fire('Mensaje', x.mensaje, 'info');
                    }
              );
          }
    })    
  }
  
  actualizaEstado(obj:Proveedor){
    obj.estado = obj.estado == 1? 0 : 1;  
    this.proveedorService.actualizar(obj).subscribe();
  }
   






























  

 

}
