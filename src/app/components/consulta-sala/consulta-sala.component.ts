import { Component, OnInit, ViewChild } from '@angular/core';
import { Sala } from 'src/app/models/sala.model';
import { SalaService } from 'src/app/services/sala.service';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { UtilService } from 'src/app/services/util.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consulta-sala',
  templateUrl: './consulta-sala.component.html',
  styleUrls: ['./consulta-sala.component.css']
})
export class ConsultaSalaComponent implements OnInit {
  
  //Ng model
  numero:string="";
  piso:string="";
  selSede:number=-1;
  displayedColumns = ["idSala","numero","piso","sede"];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

  //sala:Sala=new Sala();
  sede:DataCatalogo[]=[];

  sala: Sala[] = [];

  constructor(private SalaService:SalaService,private utilService: UtilService) {
    this.utilService.listaSede().subscribe(x=>{
      this.sede= x
    })
  }

  consultaSala(){
    this.SalaService.listaSala(this.numero, this.piso, this.selSede).subscribe(
        (x) => {
          this.dataSource = new MatTableDataSource<Sala>(x.lista);
          this.dataSource.paginator = this.paginator;
        }
    );
  }

  ngOnInit(): void {
    
  }
}
