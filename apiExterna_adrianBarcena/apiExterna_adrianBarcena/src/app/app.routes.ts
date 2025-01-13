import { Routes } from '@angular/router';
import { UserComponentsComponent } from './pages/user-components/user-components.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { UsersviewComponent } from './pages/usersview/usersview.component';

export const routes: Routes = [
  {path:"", pathMatch: "full", redirectTo: "home"},
  {path: "home", component: UserComponentsComponent},
  {path: "user/:iduser", component: UsersviewComponent},
  {path: "newuser", component: FormUserComponent},
  {path: "updateuser/:iduser", component: FormUserComponent},
  {path: "**", redirectTo: "home"}
];
