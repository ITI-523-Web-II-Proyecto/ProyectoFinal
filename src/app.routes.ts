import { Routes } from '@angular/router';
import { HomeComponent } from './app/pages/components/home/home.component';
import { OfertarEmpComponent } from './app/pages/components/empresa/ofertar-emp/ofertar-emp.component';
import { GetEmpComponent } from './app/pages/components/empresa/get-emp/get-emp.component';
import { LoginComponent } from './app/pages/components/auth/login/login.component';
import { SigninComponent } from './app/pages/components/auth/signin/signin.component';
import { HomeEmpresaComponent } from './app/pages/components/empresa/home-empresa/home-empresa.component';
import { HomePersonalComponent } from './app/pages/components/personal/home-personal/home-personal.component';
import { PerfilEmpComponent } from './app/pages/components/empresa/perfil-emp/perfil-emp.component';
import { PerfilPerComponent } from './app/pages/components/personal/perfil-per/perfil-per.component';
import { CertificadoComponent } from './app/pages/components/personal/certificado/certificado.component';
import { PuestoComponent } from './app/pages/components/personal/puesto/puesto.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'ofertaEmpresa', component: OfertarEmpComponent },
  { path: 'perfilEmpresa', component: PerfilEmpComponent },
  { path: 'getEmpresa', component: GetEmpComponent },
  { path: 'homeEmpresa', component: HomeEmpresaComponent },
  { path: 'homePersonal', component: HomePersonalComponent },
  { path: 'perfilPersonal', component: PerfilPerComponent },
  { path: 'certificado', component: CertificadoComponent },
  {path: 'ofertaPuesto', component: PuestoComponent}
];
