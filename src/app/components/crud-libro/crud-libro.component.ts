import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { LibroService } from 'src/app/services/libro.service';
import { UtilService } from 'src/app/services/util.service';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Libro } from 'src/app/models/libro.model';
import { CrudLibroAddComponent } from '../crud-libro-add/crud-libro-add.component';
import { CrudLibroUpdateComponent } from '../crud-libro-update/crud-libro-update.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crud-libro',
  templateUrl: './crud-libro.component.html',
  styleUrls: ['./crud-libro.component.css']
})
export class CrudLibroComponent implements OnInit {

  categoria:DataCatalogo[]=[];
  tipolibro:DataCatalogo[]=[];

  datasource:any;
  filtro:string="";
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
   displayedColumns = ["idLibro","titulo","anio","serie","estado","categoriaLibro","tipoLibro",'actions'];


   constructor(private formBuilder: FormBuilder,  
    private dialogService: MatDialog,
    private libroService: LibroService,
     private UtilService: UtilService) { 
      this.UtilService.listaCategoriaDeLibro().subscribe( x => this.categoria = x );
      this.UtilService.listaTipoLibroRevista().subscribe( x => this.tipolibro = x );
     }
     ngOnInit(): void {
    }



    consultaLibro(){
      console.log(">>> consultaLibro>>> " +  this.filtro);
      this.refreshTable();
 }
 private refreshTable() {
  this.libroService.consultaportitulo(this.filtro==""?"todos":this.filtro).subscribe(
    x => {
      this.datasource = new MatTableDataSource<Libro>(x);
      this.datasource.paginator = this.paginator; 
    }
  ); 
  }

  openAddDialog() {
    console.log(">>> openAddDialog  >>");
    const dialogRef = this.dialogService.open(CrudLibroAddComponent);
    dialogRef.afterClosed().subscribe(result => {
        console.log(">>> result >> " + result);
        if (result === 1) {
            this.refreshTable();
        }
    });
  }
  
openUpdateDialog(obj:Libro) {

    const dialogRef = this.dialogService.open(CrudLibroUpdateComponent, {data:obj});
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
            this.refreshTable();
      }
    });
   
  }

  elimina(obj:Libro){
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
              this.libroService.eliminar(obj.idLibro || 0).subscribe(
                    x => {
                          this.refreshTable();
                          Swal.fire('Mensaje', x.mensaje, 'info');
                    }
              );
          }
    })    
  }
  
  actualizaEstado(obj:Libro){
    obj.estado = obj.estado == 1? 0 : 1;  
    this.libroService.actualizar(obj).subscribe();
  }
   






























  

 

}
