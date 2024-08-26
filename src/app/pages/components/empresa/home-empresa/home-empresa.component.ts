import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home-empresa',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FooterComponent],
  templateUrl: './home-empresa.component.html',
  styleUrl: './home-empresa.component.css'
})
export class HomeEmpresaComponent {

}
