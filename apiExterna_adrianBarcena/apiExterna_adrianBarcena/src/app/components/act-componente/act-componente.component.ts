import { Component, Input } from '@angular/core';
import { IAct } from '../../interfaces/i-act';
import { RouterLink } from '@angular/router';
import { BotonComponenteComponent } from '../boton-componente/boton-componente.component';

@Component({
  selector: 'app-act-componente',
  standalone: true,
  imports: [RouterLink, BotonComponenteComponent],
  templateUrl: './act-componente.component.html',
  styleUrl: './act-componente.component.css'
})
export class ActComponenteComponent {
  @Input() miUser!: IAct;
}
