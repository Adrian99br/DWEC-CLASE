import { Component, inject } from '@angular/core';
import { ApiRestService } from '../../services/api-rest.service';
import { IAct } from '../../interfaces/i-act';
import { RouterLink } from '@angular/router';
import { ActComponenteComponent } from '../../components/act-componente/act-componente.component';

@Component({
  selector: 'app-user-components',
  standalone: true,
  imports: [ActComponenteComponent, RouterLink],
  templateUrl: './user-components.component.html',
  styleUrl: './user-components.component.css'
})
export class UserComponentsComponent {

  ApiRestService = inject(ApiRestService);
  arrUser : IAct[];

  constructor(){
    this.arrUser = [];
  }

  async ngOnInit() : Promise<void> {
    //Usando promesas
    try{
      const response =  await this.ApiRestService.getAllWithPromises();
        this.arrUser = response.results;
        console.log(this.arrUser);
    }catch(err) {
      console.log('Error al conectar a la API: '+err);
    }


  }
}
