import { Component } from '@angular/core';
import { PuestosService } from '../../../../services/puestos.service';
import { Puestos } from '../../../../models/puestos';
import { MatTableModule } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-puesto',
  standalone: true,
  imports: [MatTableModule, RouterLink, RouterOutlet],
  templateUrl: './puesto.component.html',
  styleUrl: './puesto.component.css'
})
export class PuestoComponent {

  displayedColumns: string[] = ['nombrePuesto', 'descripcion', 'tiempoContratacion','requisitos', 'empresa']

  puesto: Puestos[] = [];

  constructor(private puestosServ: PuestosService) {}

  ngOnInit(){
    this.cargarDatos();
  }

  cargarDatos(){
    this.puestosServ.getPuestos().subscribe((puestos) => {
      this.puesto = puestos;
    })
  }

}
