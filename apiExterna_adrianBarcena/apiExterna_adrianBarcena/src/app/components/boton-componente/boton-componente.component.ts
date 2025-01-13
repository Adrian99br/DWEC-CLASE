import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiRestService } from '../../services/api-rest.service';

@Component({
  selector: 'app-boton-componente',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './boton-componente.component.html',
  styleUrl: './boton-componente.component.css'
})
export class BotonComponenteComponent {
  @Input() miId: string = "";
  @Input() parent: string = "";

  ApiRestService = inject(ApiRestService);
  router = inject(Router);


  async borrarBoton(id: string) :Promise<void> {
    let confirmacion = confirm('Esta usted seguro que quiere borrar el usuario: '+this.miId);
    if(confirmacion){
      let response = await this.ApiRestService.delete(id);
      if(response._id){
        alert("Se ha borrado correctamente el nombre de la persona "+response.first_name);
        if(this.parent == 'view'){
          this.router.navigate(['/home']);
        }
      }
    }
  }
}
