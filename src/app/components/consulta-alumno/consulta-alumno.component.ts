import { Component, OnInit, ViewChild } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UtilService } from 'src/app/services/util.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consulta-alumno',
  templateUrl: './consulta-alumno.component.html',
  styleUrls: ['./consulta-alumno.component.css'],
})

export class ConsultaAlumnoComponent implements OnInit {

  nombres: string = "";
  selModalidad: string = "-1";
  selPais: string = "-1";
  
  displayedColumns = ["idAlumno","nombres","apellidos","telefono","dni","correo","estado","pais","modalidad"];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  modalidad:DataCatalogo[]=[];
  pais: Pais[] = [];
  alumnos: Alumno[] = [];

  constructor(private alumnoService: AlumnoService,private utilService: UtilService) {
    utilService.listaPais().subscribe(
      x => this.pais = x
    )
    utilService.listaModalidadAlumno().subscribe(
      x => this.modalidad = x
    )
  }

  ngOnInit(): void {
  }

  consultaAlumno() {
    this.alumnoService.listaAlumno(this.nombres, this.selPais, this.selModalidad).subscribe(
      (x) => {
        this.dataSource = new MatTableDataSource<Alumno>(x.lista);
        this.dataSource.paginator = this.paginator;;
      }
    );
  }

}
