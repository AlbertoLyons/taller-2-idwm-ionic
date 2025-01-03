import { Routes } from '@angular/router';
import { LoginFormComponent } from './users/components/login-form/login-form.component';
 
export const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: '',
    /*
    canActivate: [authGuard],
    children: [
      {
        path: 'airplane',
        component: AirplaneListComponent,
      },
    ],
      */
  },

];
