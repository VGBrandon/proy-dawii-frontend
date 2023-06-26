import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { UtilService } from 'src/app/services/util.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consulta-libro',
  templateUrl: './consulta-libro.component.html',
  styleUrls: ['./consulta-libro.component.css']
})
export class ConsultaLibroComponent implements OnInit {
//esto modifike
  displayedColumns=["idLibro","titulo","categoriaLibro","tipoLibro"]
  dataSource:any;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
//aca

  //"titulo", titulo).set("categoriaLibro", idCategoriaLibro).set("tipoLibro", idTipoLibro).set("estado", estado
  titulo:string="";
  categoriaLibro:number=-1;
  tipoLibro:number=-1
  
  categoria:DataCatalogo[]=[]
  tipolibro:DataCatalogo[]=[]
  libro:Libro[]=[]
  
 
  constructor(private LibroService:LibroService,private UtilService:UtilService) {
    this.UtilService.listaCategoriaDeLibro().subscribe(x=>{
      this.categoria=x
    })
    this.UtilService.listaTipoLibroRevista().subscribe(x=>{
      this.tipolibro=x
    })
   
   }
   consultaLibro(){
    this.LibroService.listaLibro(this.titulo,this.categoriaLibro,this.tipoLibro).subscribe(
      (x)=>{
        /*this.libro=x.lista;
        
        alert(x.mensaje);*/
        this.dataSource = new MatTableDataSource<Libro>(x.lista);
        this.dataSource.paginator = this.paginator;
      }
    );
   }

  ngOnInit(): void {
  }





























  
}
