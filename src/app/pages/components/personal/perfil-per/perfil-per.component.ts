import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Persona } from '../../../../models/persona';
import { PersonaService } from '../../../../services/persona.service';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { EditPerComponent } from './edit-per/edit-per.component';

@Component({
  selector: 'app-perfil-per',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    FooterComponent,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    NgFor,
    NgIf,
    MatListModule,
    MatCardModule, 
    MatButtonModule
  ],
  templateUrl: './perfil-per.component.html',
  styleUrl: './perfil-per.component.css'
})
export class PerfilPerComponent {
  persona!: Persona;
  contrasenaPer: string | undefined;

  constructor(
    private personaService: PersonaService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadPersona();
  }

  loadPersona() {
    const personaId = localStorage.getItem('personaId'); // Obtener el ID de persona desde localStorage
    if (personaId) {
      this.personaService.getPersonaById(Number(personaId)).subscribe({
        next: (data) => {
          this.persona = data;
          this.contrasenaPer = this.persona.contraseña;
        },
        error: (err) => {
          console.error('Error fetching persona data', err);
          this.snackBar.open('Error al cargar los datos de la persona', 'Cerrar', {
            duration: 3000,
          });
        }
      });
    } else {
      this.snackBar.open('No se encontró el ID de la persona en el localStorage', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/login']); // Redirigir al login si no hay ID
    }
  }

  editPersona() {
    const dialogRef = this.dialog.open(EditPerComponent, {
      width: '400px',
      data: { ...this.persona }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personaService.updatePersona(result).subscribe({
          next: () => {
            this.snackBar.open('Persona actualizada exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.loadPersona(); // Recargar los datos después de la edición
          },
          error: (err) => {
            console.error('Error updating persona', err);
            this.snackBar.open('Error al actualizar la persona', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  Delete() {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta persona?');
    if (confirmDelete) {
      this.personaService.deletePersona(this.persona.id_persona).subscribe({
        next: () => {
          this.snackBar.open('Persona eliminada exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error deleting persona', err);
          this.snackBar.open('Error al eliminar la persona', 'Cerrar', {
            duration: 3000,
          });
        }
      });
    }
  }
}
