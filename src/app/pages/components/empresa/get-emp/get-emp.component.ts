import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Empresa } from '../../../../models/empresa';
import { EmpresaService } from '../../../../services/empresa.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-get-emp',
  standalone: true,
  imports: [MatTableModule,RouterLink, RouterOutlet],
  templateUrl: './get-emp.component.html',
  styleUrl: './get-emp.component.css'
})
export class GetEmpComponent {
  displayedColumns: string[] = ['id_empresa', 'nombre', 'url', 'telefono', 'direccion', "estado"];

  lista:Empresa[]=[];


  constructor(private empresasrv:EmpresaService){}


  ngOnInit(){
    this.cargarDatos();
  }

  cargarDatos(){
    this.empresasrv.getEmpresa().subscribe((datos)=>{

      this.lista = datos;
    })
  }
}
