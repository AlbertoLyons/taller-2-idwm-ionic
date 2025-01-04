import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonMenu,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonAlert,
  MenuController,
} from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';
import { Product, ProductData } from 'src/app/interfaces/products/product-data';
import { ProductService } from 'src/app/services/product.service';
import { logOutOutline, personOutline, receiptOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-products-list',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonMenu,
    IonButtons,
    IonMenuButton,
    IonSearchbar,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonAlert,
  ],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent  implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);
  name: string = '';
  type: string = 'Nada';
  sortOrder: string = 'asc';
  protected productData: ProductData = {
    products: [],
    message: '',
    totalRecords: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 0,
    concat(response: Product): ProductData {
      this.products.push(response);
      return this;
    }
  };
  protected actualPage = 1;
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Si',
      role: 'confirm',
    },
  ];
  constructor(private menuCtrl: MenuController) { 
    addIcons({
      'person-outline': personOutline,
      'receipt-outline': receiptOutline,
      'log-out-outline': logOutOutline,
      'trash-outline': trashOutline,
    });
  }
  ngOnInit(): void {
    this.loadProducts(1, 'asc', 'Nada','');
  }
  loadProducts(page: number, sortOrder: string, type: string, name: string): void {
    this.productService.getProducts(page, sortOrder, type,name).then((products) => {
      console.log("Productos:", products.products);
      this.productData = products;
      this.actualPage = products.currentPage;
    }).catch((error) => {
      console.log("Error:", error);
    });
  }
  searchProducts(): void {
    this.loadProducts(1, this.sortOrder, this.type, this.name);
  }
  onSearchInput(event: any): void {
    this.name = event.target.value;
  }
  onTypeChange(event: any): void {
    this.type = event.target.value;
  }
  onSortChange(event: any): void {
    this.sortOrder = event.target.value;
  }
  addToCart(product: Product): void {
    console.log('Product:', product);
  }
  openOptionsMenu(): void {
    this.menuCtrl.open('end');
  }
  openRecepits(): void {
    this.router.navigate(['receipts']);
  }
  logout(): void {
    this.localStorageService.removeValue('token');
    this.localStorageService.removeValue('user');
    this.router.navigate(['login']);
  }
  // TODO: Implement delete product
  deleteResult(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      let id = this.localStorageService.getVariable('user').id;
      console.log("ID:", id);
      try{
        this.userService.deleteUser(id);
        this.router.navigate(['login']);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }
  lastPage(): void {
    if (this.actualPage > 1) {
      this.loadProducts(this.actualPage - 1, 'asc', 'Nada','');
    }
  }
  nextPage(): void {
    if (this.actualPage < this.productData.totalPages) {
      this.loadProducts(this.actualPage + 1, 'asc', 'Nada','');
    }
  }
}
