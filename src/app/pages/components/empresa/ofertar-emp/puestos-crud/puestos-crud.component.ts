import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { Puestos } from '../../../../../models/puestos';
import { PuestosService } from '../../../../../services/puestos.service';

@Component({
  selector: 'app-puestos-crud',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './puestos-crud.component.html',
  styleUrls: ['./puestos-crud.component.css']
})
export class PuestosCrudComponent {

  title = "";
  accion = 0;
  isNew = false;
  isRead = false;
  readonly dialogRef = inject(MatDialogRef<PuestosCrudComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  puesto!: Puestos;
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private puestosSrv: PuestosService) {
    this.myForm = this.fb.group({
      id_puesto: ['', ],
      nombrePuesto: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      tiempoContratacion: ['', [Validators.required]],
      requisitos: ['', [Validators.required]],
      estado: [true],
      empresaId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.accion = this.data?.accion;
    this.isRead = this.accion == 3;
    this.isNew = this.accion == 1;

    this.title = this.isNew ? "Crear Puesto" : this.accion == 2 ? "Modificar Puesto" : "Detalle del Puesto";

    if (this.accion == 2 || this.accion == 3) {
      this.puesto = this.data?.puesto;
      this.myForm.patchValue({
        id_puesto: this.puesto.id_puesto,
        nombrePuesto: this.puesto.nombrePuesto,
        descripcion: this.puesto.descripcion,
        tiempoContratacion: this.puesto.tiempoContratacion,
        requisitos: this.puesto.requisitos,
        estado: this.puesto.estado,
        empresaId: this.puesto.empresa.id_empresa
      });
    } else if (this.isNew) {
      this.myForm.reset({
        id_puesto: '',
        nombrePuesto: '',
        descripcion: '',
        tiempoContratacion: '',
        requisitos: '',
        estado: true,
        empresaId: this.data?.empresaId
      });
    }
  }

  onSave() {
    if (this.isNew) {
      if (this.myForm.valid) {
        this.puestosSrv.createPuesto(this.myForm.value).subscribe((resp) => {
          alert("Puesto guardado correctamente");
          this.dialogRef.close(true);
        }, (err) => {
          console.log(err);
          alert("Error al guardar");
        });
      }
    } else if (this.accion == 2) {
      if (this.myForm.valid) {
        const updatedPuesto = { ...this.myForm.value, id_puesto: this.puesto.id_puesto, empresa: this.puesto.empresa };
        this.puestosSrv.updatePuesto(this.puesto.id_puesto, updatedPuesto).subscribe((resp) => {
          alert("Puesto modificado correctamente");
          this.dialogRef.close(true);
        }, (err) => {
          console.log(err);
          alert("Error al modificar");
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
