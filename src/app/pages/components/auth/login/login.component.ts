import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EmpresaService } from '../../../../services/empresa.service';
import { Empresa } from '../../../../models/empresa';
import { PersonaService } from '../../../../services/persona.service';
import { Persona } from '../../../../models/persona';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgClass, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  personalLoginForm!: FormGroup;
  empresaLoginForm!: FormGroup;

  constructor( private fb: FormBuilder, private empresaService: EmpresaService, private personaService:PersonaService, private router: Router) {
    this.personalLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.empresaLoginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmitPersonal() {
    if (this.personalLoginForm.valid) {
      console.log('Formulario personal enviado:', this.personalLoginForm.value);
  
      const { email, password } = this.personalLoginForm.value;
  
      this.personaService.getPersona().subscribe({
        next: (personas: Persona[]) => {
          const persona = personas.find(pers =>
            pers.email === email &&
            pers.contraseña === password
          );
  
          if (persona) {
            localStorage.setItem('personaId', persona.id_persona.toString());
            alert('Inicio de sesión exitoso');
            this.router.navigate(['/homePersonal']); // Redirige al home de persona
          } else {
            alert('Credenciales incorrectas');
          }
        },
        error: (err) => {
          console.error('Error al intentar iniciar sesión:', err);
          alert('Error al intentar iniciar sesión');
        }
      });
    }
  }

  onSubmitEmpresa() {
    if (this.empresaLoginForm.valid) {
      console.log('Formulario de empresa enviado:', this.empresaLoginForm.value);
      this.empresaService.getEmpresa().subscribe({
        next: (empresas: Empresa[]) => {
          const empresa = empresas.find(emp =>
            emp.url === this.empresaLoginForm.value.email &&
            emp.contraseña === this.empresaLoginForm.value.password
          );

          if (empresa) {
            localStorage.setItem('empresaId', empresa.id_empresa.toString());
            alert('Inicio de sesión exitoso');
            this.router.navigate(['/homeEmpresa']); 
          } else {
            alert('Credenciales incorrectas');
          }
        },
        error: (err) => {
          console.error('Error al intentar iniciar sesión:', err);
          alert('Error al intentar iniciar sesión');
        }
      });
    }
  }

  isActive: boolean = false;


  toggleRegister() {
    this.isActive = true;
  }

  toggleLogin() {
    this.isActive = false;
  }

}
