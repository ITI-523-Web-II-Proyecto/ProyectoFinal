import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-empresa',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home-empresa.component.html',
  styleUrl: './home-empresa.component.css'
})
export class HomeEmpresaComponent {

}
