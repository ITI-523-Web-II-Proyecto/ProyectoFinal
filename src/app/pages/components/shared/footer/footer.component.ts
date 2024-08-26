import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(public router: Router) {}

  shouldShowFooter(): boolean {
    // Lista de rutas en las que no quieres mostrar el footer
    const noFooterRoutes = ['/login', '/signin', '/ofertaEmpresa','/perfilEmpresa','/getEmpresa','/perfilPersonal','/ofertaTrabajo', '/certificaciones'];
    return !noFooterRoutes.includes(this.router.url);
  }

}
