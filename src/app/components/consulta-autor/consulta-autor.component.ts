import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from 'src/app/models/autor.model';
import { Pais } from 'src/app/models/pais.model';
import { AutorService } from 'src/app/services/autor.service';
import { PaisService } from '../../services/Pais.service';

@Component({
  selector: 'app-consulta-autor',
  templateUrl: './consulta-autor.component.html',
  styleUrls: ['./consulta-autor.component.css']
})
export class ConsultaAutorComponent implements OnInit {


  nombres: string = "";


  displayedColumns = ["nombre","estado","pais"];
   //Grila
   dataSource:any;
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  selPais: string = "-1";
  estado: boolean = true;
  /*pais?:Pais; */

  //llenar el combo primero inicializar
  pais: Pais[] = [];

  //para mostrar los datos en la grilla table
  autores: Autor[] = [];

  constructor(private autorService: AutorService, private paisService: PaisService) {
    paisService.listarPAis().subscribe(
      x => this.pais = x
    )

  }

  ngOnInit(): void {
  }


  consultaAutor() {
    this.autorService.listaAutor(this.nombres, this.selPais, this.estado ?1 :0).subscribe(
      (x) => {
        //this.autores = x.lista;
        //alert(x.mensaje);
        this.dataSource = new MatTableDataSource<Autor>(x.lista);
        this.dataSource.paginator = this.paginator;;
      }

    );
  }































}
