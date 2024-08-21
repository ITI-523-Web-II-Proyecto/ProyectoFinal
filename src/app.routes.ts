
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'
import { SigninComponent } from './auth/signin/signin.component'
import { HomeComponent } from './app/home/home.component';
import { OfertarEmpComponent } from './app/ofertar-emp/ofertar-emp.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'oferta', component: OfertarEmpComponent }
  
  
];
