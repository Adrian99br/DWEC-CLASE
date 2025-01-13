import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRestService } from '../../services/api-rest.service';
import { IAct } from '../../interfaces/i-act';
import { BotonComponenteComponent } from "../../components/boton-componente/boton-componente.component";

@Component({
  selector: 'app-usersview',
  standalone: true,
  imports: [BotonComponenteComponent],
  templateUrl: './usersview.component.html',
  styleUrl: './usersview.component.css'
})
export class UsersviewComponent {

  activatedRoute = inject(ActivatedRoute);
  ApiRestService = inject(ApiRestService);

  miUser!: IAct;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe( async (params: any) => {
      let id : string = params.iduser as string;
      try{
          this.miUser = await this.ApiRestService.getById(id);
      }catch(err){
        console.log("Error al llamar a la API: "+err);
      }
    });
  }
}
