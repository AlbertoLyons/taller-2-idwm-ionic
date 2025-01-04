import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/users/components/login-form/login-form.component';
import { ProductsListComponent } from './pages/products/components/products-list/products-list.component';
import { authGuard } from './guards/auth.guard';
import { ReceiptsListComponent } from './pages/receipts/componentes/receipts-list/receipts-list.component';
 
export const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'products',
    component: ProductsListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'receipts',
    component: ReceiptsListComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
  
];
