import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SalaService } from 'src/app/services/sala.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sala } from 'src/app/models/sala.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/services/util.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { CrudSalaAddComponent } from '../crud-sala-add/crud-sala-add.component';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { CrudSalaUpdateComponent } from '../crud-sala-update/crud-sala-update.component';


@Component({
  selector: 'app-crud-sala',
  templateUrl: './crud-sala.component.html',
  styleUrls: ['./crud-sala.component.css']
})
export class CrudSalaComponent implements OnInit {

  lstsede:DataCatalogo[]=[];
  lstsala: DataCatalogo[] = [];
  
  //Grila
  dataSource:any;

  //Para la Grilla
  filtro: string ="";

  numeros: string = "";
  selSede: string = "-1";
  estado: boolean = true;
  


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idSala","numero","piso","numAlumnos","recursos","estado",'actions'];

  constructor(private formBuilder: FormBuilder,  
            private dialogService: MatDialog,
            private salaService:SalaService,
            private UtilService: UtilService
      ) {
      this.UtilService.listaSede().subscribe( x => this.lstsede = x );
      this.UtilService.listaTipoSala().subscribe( x => this.lstsala = x );
    }

    ngOnInit(): void {
      this.listarSala()
    }
  
  
  
    consultaSala(){
         console.log(">>> consultaSala >>> " +  this.filtro);
         this.refreshTable();
    }

  
    
    private refreshTable() {
      this.salaService.consultaPorNumero(this.filtro==""?"todos":this.filtro).subscribe({
        next: (response)=>{
          console.log(response)
          this.dataSource = new MatTableDataSource<any>(response);
          this.dataSource.paginator = this.paginator; 
        }
      })
  }

  listarSala(){
      this.salaService.listarSalas().subscribe({
        next: (response)=>{
          this.dataSource = response
        }
      })
  }
  
  
  openAddDialog() {
    console.log(">>> openAddDialog  >>");
    const dialogRef = this.dialogService.open(CrudSalaAddComponent);
    dialogRef.afterClosed().subscribe(result => {
        console.log(">>> result >> " + result);
        if (result === 1) {
            this.refreshTable();
        }
    });
  }
  
  
  openUpdateDialog(obj:Sala) {
  
  
    const dialogRef = this.dialogService.open(CrudSalaUpdateComponent, {data:obj});
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
            this.refreshTable();
      }
    });
   
  }
  
  
  
  elimina(obj:Sala){
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
              this.salaService.elimina(obj.idSala || 0).subscribe(
                    x => {
                          this.refreshTable();
                          Swal.fire('Mensaje', x.mensaje, 'info');
                    }
              );
          }
    })    
  }
  
  
   actualizaEstado(obj:Sala){
    obj.estado = obj.estado == 1? 0 : 1;  
    this.salaService.actualiza(obj).subscribe();
  }
}
  