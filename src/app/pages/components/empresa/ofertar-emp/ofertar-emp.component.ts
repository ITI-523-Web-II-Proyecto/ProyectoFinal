import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PuestosCrudComponent } from './puestos-crud/puestos-crud.component';
import { Puestos } from '../../../../models/puestos';
import { PuestosService } from '../../../../services/puestos.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ofertar-emp',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    PuestosCrudComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    NgFor,
    NgIf,
    NgClass],
  templateUrl: './ofertar-emp.component.html',
  styleUrl: './ofertar-emp.component.css'
})
export class OfertarEmpComponent {
  puestos: Puestos[] = [];

  constructor(
    private puestosService: PuestosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.cargarPuestos();
  }

  cargarPuestos() {
    this.puestosService.getPuestos().subscribe({
      next: (data) => {
        console.log('Puestos recibidos:', data);
        const empresaId = localStorage.getItem('empresaId');
        console.log('empresaId del localStorage:', empresaId);

        if (empresaId) {
          this.puestos = data.filter(puesto => {
            console.log(`Comparando ${puesto.empresa.id_empresa} con ${empresaId}`);
            return String(puesto.empresa.id_empresa) === empresaId;
          });
          console.log('Puestos después del filtrado:', this.puestos);

          if (this.puestos.length === 0) {
            this.snackBar.open('No hay puestos disponibles para esta empresa', 'Cerrar', {
              duration: 3000,
            });
          }
        } else {
          this.snackBar.open('No se encontró el ID de la empresa en el localStorage', 'Cerrar', {
            duration: 3000,
          });
        }
      },
      error: (err) => {
        console.error('Error fetching puestos data', err);
        this.snackBar.open('Error al cargar los puestos', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  
  abrirDialogo(isNew: boolean, puesto?: Puestos) {
    const accion = isNew ? 1 : 2; // 1 para crear, 2 para editar
    const dialogRef = this.dialog.open(PuestosCrudComponent, {
      width: '400px',
      data: {
        puesto: isNew ? {} : puesto, // Si es nuevo, manda un objeto vacío
        accion: accion,
        empresaId: localStorage.getItem('empresaId') // ID de la empresa que se pasa al componente hijo
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPuestos(); // Recargar la lista de puestos si se realizó una acción
      }
    });
  }
  

  eliminarPuesto(id: number) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este puesto?');
    
    if (confirmDelete) {
      this.puestosService.deletePuesto(id).subscribe({
        next: () => {
          this.snackBar.open('Puesto eliminado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.cargarPuestos(); // Recargar los puestos después de eliminar
        },
        error: (err) => {
          console.error('Error deleting puesto', err);
          this.snackBar.open('Error al eliminar el puesto', 'Cerrar', {
            duration: 3000,
          });
        }
      });
    }
  }
}
