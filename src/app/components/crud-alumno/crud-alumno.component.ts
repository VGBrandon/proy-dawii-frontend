import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UtilService } from 'src/app/services/util.service';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno.model';
import { CrudAlumnoAddComponent } from '../crud-alumno-add/crud-alumno-add.component';
import { CrudAlumnoUpdateComponent } from '../crud-alumno-update/crud-alumno-update.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-alumno',
  templateUrl: './crud-alumno.component.html',
  styleUrls: ['./crud-alumno.component.css']
})
export class CrudAlumnoComponent implements OnInit {

  paises: Pais[] = [];
  modalidades: DataCatalogo[] = [];

  datasource:any;
  filtro:string="";
  nombres: string = "";
  selPais: string = "-1";
  estado: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
   displayedColumns = ["idAlumno","nombres","apellidos","telefono","dni","pais","modalidad","estado",'actions'];


   constructor(private formBuilder: FormBuilder,
    private dialogService: MatDialog,
    private alumnoService : AlumnoService,
    private utilService: UtilService) {
      this.utilService.listaPais().subscribe( x => this.paises = x );
      this.utilService.listaModalidadAlumno().subscribe( x => this.modalidades = x );
     }
     ngOnInit(): void {
    }

    consultaAlumno(){
      console.log(">>> consultaAlumno >>> " +  this.filtro);
      this.refreshTable();
    }
    private refreshTable() {
      this.alumnoService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
        x => {
          this.datasource = new MatTableDataSource<Alumno>(x);
          this.datasource.paginator = this.paginator;
        }
      );
    }

  openAddDialog() {
    console.log(">>> openAddDialog  >>");
    const dialogRef = this.dialogService.open(CrudAlumnoAddComponent);
    dialogRef.afterClosed().subscribe(result => {
        console.log(">>> result >> " + result);
        if (result === 1) {
            this.refreshTable();
        }
    });
  }

openUpdateDialog(obj:Alumno) {

    const dialogRef = this.dialogService.open(CrudAlumnoUpdateComponent, {data:obj});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
            this.refreshTable();
      }
    });

  }

  elimina(obj:Alumno){
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
              this.alumnoService.eliminar(obj.idAlumno || 0).subscribe(
                    x => {
                          this.refreshTable();
                          Swal.fire('Mensaje', x.mensaje, 'info');
                    }
              );
          }
    })
  }

  actualizaEstado(obj:Alumno){
    obj.estado = obj.estado == 1? 0 : 1;
    this.alumnoService.actualizar(obj).subscribe();
  }

}
