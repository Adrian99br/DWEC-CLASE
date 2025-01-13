import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IAct } from '../interfaces/i-act';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  httpClient = inject(HttpClient);
  private baseUrl :string = 'https://peticiones.online/api/users';


  constructor() { }

  getAllWithPromises() : Promise <any> {
    return lastValueFrom(this.httpClient.get<IAct[]>(this.baseUrl));
  }

  getById(id: string): Promise<IAct> {
    return lastValueFrom(this.httpClient.get<IAct>(`${this.baseUrl}/${id}`));
  }

  insert(persona: IAct): Promise<IAct>{
    return lastValueFrom(this.httpClient.post<IAct>(this.baseUrl, persona));
  }

  update(persona: IAct): Promise<IAct>{
    return lastValueFrom(this.httpClient.put<IAct>(`${this.baseUrl}/${persona.id}`, persona));
  }

  delete(iduser: string) : Promise<IAct>{
    return lastValueFrom(this.httpClient.delete<IAct>(`${this.baseUrl}/${iduser}`));
  }
}
