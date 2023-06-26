import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AutorService } from 'src/app/services/autor.service';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from '../../models/autor.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { CrudAutorAddComponent } from '../crud-autor-add/crud-autor-add.component';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { CrudAutorUpdateComponent } from '../crud-autor-update/crud-autor-update.component';


@Component({
  selector: 'app-crud-autor',
  templateUrl: './crud-autor.component.html',
  styleUrls: ['./crud-autor.component.css']
})
export class CrudAutorComponent implements OnInit {

  lstPais: Pais[] = [];
  lstGrado: DataCatalogo[] = [];
   //Grila
   dataSource:any;
   //Para la Grilla
   filtro: string ="";


   nombres: string = "";
   selPais: string = "-1";
   estado: boolean = true;

   


   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
   displayedColumns = ["idAutor","nombre","apellidos","grado","pais","telefono","fechanacimiento","estado",'actions'];

  constructor(private formBuilder: FormBuilder,  
    private dialogService: MatDialog,
    private autorService: AutorService,
     private UtilService: UtilService
   // private ubigeoService:UbigeoService
    ) {
      this.UtilService.listaPais().subscribe( x => this.lstPais = x );
      this.UtilService.listaGradoAutor().subscribe( x => this.lstGrado = x );
          
}

  ngOnInit(): void {}



  consultaAutor(){
       console.log(">>> consultaDocente >>> " +  this.filtro);
       this.refreshTable();
  }
 


  
private refreshTable() {
  this.autorService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
    x => {
      this.dataSource = new MatTableDataSource<Autor>(x);
      this.dataSource.paginator = this.paginator; 
    }
  ); 


/*   this.autorService.listaAutor(this.nombres, this.selPais, this.estado ?1 :0).subscribe(
    (x) => {
      
      this.dataSource = new MatTableDataSource<Autor>(x.lista);
      this.dataSource.paginator = this.paginator;;
    }

  ); */

}









openAddDialog() {
  console.log(">>> openAddDialog  >>");
  const dialogRef = this.dialogService.open(CrudAutorAddComponent);
  dialogRef.afterClosed().subscribe(result => {
      console.log(">>> result >> " + result);
      if (result === 1) {
          this.refreshTable();
      }
  });
}








openUpdateDialog(obj:Autor) {
/*   console.log(">>> openUpdateDialog  >> 111");
  console.log(">>> idDocente >> " + obj.idDocente);
  console.log(">>> nombre >>  " + obj.nombre);
  console.log(">>> dni >>  " + obj.dni);
  console.log(">>> estado >>  " + obj.estado);
  console.log(">>> idUbigeo >>  " + obj.ubigeo?.idUbigeo);
  console.log(">>> departamento >>  " + obj.ubigeo?.departamento);
  console.log(">>> provincia >>  " + obj.ubigeo?.provincia);
  console.log(">>> distrito >>  " + obj.ubigeo?.distrito); */


  const dialogRef = this.dialogService.open(CrudAutorUpdateComponent, {data:obj});

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
          this.refreshTable();
    }
  });
 
}



elimina(obj:Autor){
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
            this.autorService.elimina(obj.idAutor || 0).subscribe(
                  x => {
                        this.refreshTable();
                        Swal.fire('Mensaje', x.mensaje, 'info');
                  }
            );
        }
  })    
}


 actualizaEstado(obj:Autor){
  obj.estado = obj.estado == 1? 0 : 1;  
  this.autorService.actualiza(obj).subscribe();
}
 



}
