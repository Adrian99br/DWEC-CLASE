import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractControl, Form, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent, RouterLink } from '@angular/router';
import { ApiRestService } from '../../services/api-rest.service';
import { IAct } from '../../interfaces/i-act';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {

  userForm: FormGroup;
  tipo: string = "Añadir";

  activateRoute = inject(ActivatedRoute);
  ApiRestService = inject(ApiRestService);
  router = inject(Router);

  hide = true;
  hideShow = false;


  constructor() {
      this.userForm = new FormGroup({
        first_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        last_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
        email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w.-]+@[\w.-]+$/)]),
        image: new FormControl(null, [Validators.required, Validators.pattern(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?:\.[A-Za-z]{2,})?)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?){1,255}$/)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)])
      }, []);
  }

  ngOnInit(): void {
      this.activateRoute.params.subscribe(async (params: any) => {
          if (params.iduser) {
              //pedir user por id
              this.tipo = "Actualizar";
              const response = await this.ApiRestService.getById(params.iduser);

              this.userForm = new FormGroup({
                  id: new FormControl(response.id, []),
                  first_name: new FormControl(response.first_name, [Validators.required, Validators.minLength(3)]),
                  last_name: new FormControl(response.last_name, [Validators.required, Validators.minLength(3)]),
                  username: new FormControl(response.username, [Validators.required, Validators.minLength(4)]),
                  email: new FormControl(response.email, [Validators.required, Validators.pattern(/^[\w.-]+@[\w.-]+$/)]),
                  image: new FormControl(response.image, [Validators.required, Validators.pattern(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?:\.[A-Za-z]{2,})?)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?){1,255}$/)]),
                  password: new FormControl(response.password, [Validators.required, Validators.minLength(8)])
              }, []);
          }
      });
  }

  toggleVisibility(): void {
    this.hide = !this.hide;
      this.hideShow = !this.hide;

  }
  async getDataForm() {
      const userNew: IAct = this.userForm.value;
      console.log(this.userForm.value);
      if (userNew.first_name != "") {
          if (userNew.id) {
              //Actualizar
              const response = await this.ApiRestService.update(userNew);
              if (response.id) {
                  Swal.fire({
                      title: "Usuario Actualizado",
                      text: "El usuario " + response.first_name + " se ha actualizado correctamente",
                      icon: "success",
                      confirmButtonText: "Aceptar"
                  });
                  // alert(`El usuario ${response.first_name} se ha actualizado correctamente`);
                  this.router.navigate(['/users']);
              } else {
                  alert("Ha ocurrido un problema con la actualizacion")
              }
          } else {
              //Insertar
              const response = await this.ApiRestService.insert(userNew);
              if (response.id) {
                  Swal.fire({
                      title: "Usuario Añadido",
                      text: "El usuario se ha añadido correctamente",
                      icon: "success",
                      confirmButtonText: "Aceptar"
                  });
                  // alert(`El usuario ${response.first_name} se ha insertado correctamente`);
                  this.router.navigate(['/users']);
              } else {
                  alert("Ha ocurrido un problema con la insercion")
              }
          }
      }
  }

  checkControl(formControlName: string, validador: string): boolean | undefined {
      return this.userForm.get(formControlName)?.hasError(validador) &&
          this.userForm.get(formControlName)?.touched;
  }

}


