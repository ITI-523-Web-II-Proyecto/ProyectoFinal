import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona } from '../../../../../models/persona';
import { PersonaService } from '../../../../../services/persona.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Importa MatSelectModule

@Component({
  selector: 'app-edit-per',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,  // Asegúrate de importar MatSelectModule aquí
  ],
  templateUrl: './edit-per.component.html',
  styleUrls: ['./edit-per.component.css']
})
export class EditPerComponent {
  personaForm!: FormGroup;
  personaId!: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPerComponent>,
    private personaService: PersonaService,
    @Inject(MAT_DIALOG_DATA) public data: Persona
  ) {
    // Obtener el ID de la persona desde localStorage
    this.personaId = Number(localStorage.getItem('personaId'));

    // Inicializar el formulario con los valores actuales de la persona
    this.personaForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      telefono: [data.telefono, Validators.required],
      contraseña: [data.contraseña, Validators.required],
      estado: [data.estado, Validators.required]
    });
  }

  onSave() {
    if (this.personaForm.valid) {
      const updatedPersona: Persona = {
        ...this.data,
        ...this.personaForm.value,
        id_persona: this.personaId  // Asegurarse de que el ID se mantenga
      };
      this.personaService.updatePersona(updatedPersona).subscribe({
        next: () => {
          this.dialogRef.close(updatedPersona);
        },
        error: (err) => {
          console.error('Error updating persona', err);
          alert('Error al actualizar la persona');
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
