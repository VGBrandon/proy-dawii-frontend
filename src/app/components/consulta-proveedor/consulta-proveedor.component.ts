import { Component, OnInit, ViewChild } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { PaisService } from 'src/app/services/Pais.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-consulta-proveedor',
  templateUrl: './consulta-proveedor.component.html',
  styleUrls: ['./consulta-proveedor.component.css']
})
export class ConsultaProveedorComponent implements OnInit {
  

  razonsocial: string = "";

  selPais: string = "-1";
  estado: boolean = true;
 displayedColumns = ["nombre","ruc","direccion","celular","contacto","estado","pais","tipoProveedor"];  
 
 dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  pais: Pais[] = [];
  proveedores: Proveedor[] = [];

  constructor(private proveedorService: ProveedorService, private paisService: PaisService) {
    paisService.listarPAis().subscribe(
      x => this.pais = x
    )

  }
  
  ngOnInit(): void {
  }


  consultaProveedor() {
    this.proveedorService.listaProveedor(this.razonsocial, this.selPais, this.estado ?1 :0).subscribe(
      (x) => {
        this.dataSource = new MatTableDataSource<Proveedor>(x.lista);
        this.dataSource.paginator = this.paginator;;
      }

    );
  }






}
