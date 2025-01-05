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
  IonSearchbar,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonAlert,
  MenuController,
  AlertController,
} from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';
import { Product, ProductData } from 'src/app/interfaces/products/product-data';
import { ProductService } from 'src/app/services/product.service';
import { logOutOutline, personOutline, receiptOutline, reorderThreeOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
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
    IonSearchbar,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonAlert,
  ],
  providers:[LocalStorageService],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent  implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
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

  constructor(private menuCtrl: MenuController, private alertController: AlertController) { 
    addIcons({
      'person-outline': personOutline,
      'receipt-outline': receiptOutline,
      'log-out-outline': logOutOutline,
      'trash-outline': trashOutline,
      "reorder-three-outline": reorderThreeOutline,
    });
  }
  ngOnInit(): void {
    this.menuCtrl.close('products-options');
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
  async addToCart(product: Product): Promise<void> {
    this.cartService.addProduct(product.id).then(async (response) => {
      const alert = await this.alertController.create({
        header: 'Añadido',
        message: 'El producto fue añadido al carrito',
        buttons: ['Cerrar'],
      });
      await alert.present();
    }).catch((error) => {
      console.log("Error:", error);
    });
  }
  openFilters(): void {
  this.menuCtrl.open('Filters');
  }
  openOptionsMenu(): void {
    this.menuCtrl.open('products-options');
  }
  openRecepits(): void {
    this.menuCtrl.close('products-options');
    this.router.navigate(['receipts']);
  }
  logout(): void {
    this.localStorageService.removeValue('token');
    this.localStorageService.removeValue('user');
    this.router.navigate(['login']);
  }
  deleteResult(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      const id = JSON.parse(this.localStorageService.getVariable('user')).id; 
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
