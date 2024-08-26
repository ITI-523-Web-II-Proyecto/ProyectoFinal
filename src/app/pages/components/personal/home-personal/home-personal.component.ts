import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home-personal',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FooterComponent],
  templateUrl: './home-personal.component.html',
  styleUrl: './home-personal.component.css'
})
export class HomePersonalComponent {

}
