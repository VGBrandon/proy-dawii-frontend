import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Alumno } from 'src/app/models/alumno.model';
import { Tesis } from 'src/app/models/tesis.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { TesisService } from 'src/app/services/tesis.service';
@Component({
  selector: 'app-consulta-tesis',
  templateUrl: './consulta-tesis.component.html',
  styleUrls: ['./consulta-tesis.component.css']
})
export class ConsultaTesisComponent implements OnInit {

  //NG MODEL
  titulo:string="";
  tema:string ="";
  selAlumno:number = -1;

  //alumno
  nom_alu :Alumno[]=[];

  dataSource:any;
 
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  displayedColumns = ["idTesis","titulo","tema","fechaCreacion","fechaRegistro","alumno","estado"];

  constructor(private alumnoService: AlumnoService, private tesisService:TesisService) { 
    alumnoService.listaAlumnoNombres().subscribe(
      x => this.nom_alu = x
    )
  }

consultaTesis(){
    this.tesisService.listaTesis(this.titulo, this.tema, this.selAlumno).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Tesis>(x.lista);
        this.dataSource.paginator = this.paginator;
        alert(x.mensaje);
      }
    );
}
  ngOnInit(): void {
  }

}
