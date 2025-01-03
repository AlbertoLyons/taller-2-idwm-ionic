import { Routes } from '@angular/router';
import { LoginFormComponent } from './users/components/login-form/login-form.component';
import { ProductsListComponent } from './pages/products/components/products-list/products-list.component';
import { authGuard } from './guards/auth.guard';
 
export const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  
  {

    path: '',
    
    canActivate: [authGuard],
    children: [
      {
        path: 'products',
        component: ProductsListComponent,
      },
    ],
      
  },
  
];
