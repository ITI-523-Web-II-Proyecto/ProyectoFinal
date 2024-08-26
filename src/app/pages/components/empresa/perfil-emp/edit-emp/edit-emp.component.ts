import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empresa } from '../../../../../models/empresa';
import { EmpresaService } from '../../../../../services/empresa.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-edit-emp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './edit-emp.component.html',
  styleUrl: './edit-emp.component.css'
})
export class EditEmpComponent {
  empresaForm!: FormGroup;
  empresaId!: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditEmpComponent>,
    private empresaService: EmpresaService,
    @Inject(MAT_DIALOG_DATA) public data: Empresa
  ) {
    // Obtener el ID de la empresa desde localStorage
    this.empresaId = Number(localStorage.getItem('empresaId'));

    // Inicializar el formulario con los valores actuales de la empresa
    this.empresaForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      url: [data.url, Validators.required],
      contraseña: [data.contraseña, Validators.required],
      telefono: [data.telefono, Validators.required],
      direccion: [data.direccion, Validators.required]
    });
  }

  onSave() {
    if (this.empresaForm.valid) {
      const updatedEmpresa: Empresa = {
        ...this.data,
        ...this.empresaForm.value,
        id_empresa: this.empresaId  // Asegurarse de que el ID se mantenga
      };
      this.empresaService.updateEmpresa(updatedEmpresa).subscribe({
        next: () => {
          this.dialogRef.close(updatedEmpresa);
        },
        error: (err) => {
          console.error('Error updating empresa', err);
          alert('Error al actualizar la empresa');
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

