import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractControl, Form, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent, RouterLink } from '@angular/router';
import { ApiRestService } from '../../services/api-rest.service';
import { IAct } from '../../interfaces/i-act';


@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {


  modelForm: FormGroup;
  tipo: string = "Añadir";

  activatedRoute = inject(ActivatedRoute);
  ApiRestService = inject(ApiRestService);
  router = inject(Router);


  constructor(){
    this.modelForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

    }, []);
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) =>{
      if(params.iduser){
        //pedir serie por id
        this.tipo = "Actualizar";

        const response = await this.ApiRestService.getById(params.iduser);

        this.modelForm = new FormGroup({
          _id: new FormControl(response._id, []),
          name: new FormControl(response.name, [Validators.required]),
          username: new FormControl(response.username, [Validators.required]),
          email: new FormControl(response.email, [Validators.required]),
          image: new FormControl(response.image, [Validators.required]),
          password: new FormControl(response.password,[Validators.required])
        }, []);
      }
    });
  }

  async getDataForm() {
    let user: IAct = this.modelForm.value;
    if(user._id != ''){
      if(user.id){
        //Actualizar
        const response = await this.ApiRestService.update(user);
        if (response.id) {
          alert(`El usuario ${response._id} se ha actualizado correctamente`);
        this.router.navigate(['/home']);
        } else {
          alert(`Ha ocurrido un problema en la actualizacion`);
        }
      }
      else{
        //Insertar
        const response = await this.ApiRestService.insert(user);
        if(response.id){
          alert(`El usuario ${response.username} se ha añadido correctamente`);
          this.router.navigate(['/home']);
        }
        else {
          alert(`Ha ocurrido un problema en la insercion`);
        }
      }
    }else{
      alert(`Debe de rellenar todos los campos`);
    }
  }
}

