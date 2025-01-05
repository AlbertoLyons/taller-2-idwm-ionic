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
  IonIcon,
  MenuController,
} from '@ionic/angular/standalone';
import { ReceiptData } from 'src/app/interfaces/receipts/receipt-data';
import { ReceiptService } from 'src/app/services/receipt.service';
import { logOutOutline, personOutline, receiptOutline, storefrontOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-receipts-list',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonIcon,
  ],
  providers:[LocalStorageService],
  templateUrl: './receipts-list.component.html',
  styleUrls: ['./receipts-list.component.scss'],
})
export class ReceiptsListComponent  implements OnInit {
  private readonly receiptService = inject(ReceiptService);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);
  protected receiptData: ReceiptData = { message: '', receipts: [] };
  protected receipts = this.receiptData.receipts;
  constructor(private menuCtrl: MenuController) { 
    addIcons({
      'person-outline': personOutline,
      'receipt-outline': receiptOutline,
      'log-out-outline': logOutOutline,
      'trash-outline': trashOutline,
      'storefront-outline': storefrontOutline,
    });
  }
  ngOnInit() {
    this.getReceipts();
    this.menuCtrl.close('end');
  }
  getReceipts(): void {
    this.receiptService.getReceipts().then((receipts) => {
      console.log("Receipts", receipts);
      this.receiptData = receipts;
      this.receipts = this.receiptData.receipts;

      this.receipts.forEach(receipt => {
        receipt.boughtAt = new Date(receipt.boughtAt).toLocaleDateString();
      });
    });
  }
  openProducts(): void {
    this.router.navigate(['products']);
  }
  logout(): void {
    this.localStorageService.removeValue('token');
    this.localStorageService.removeValue('user');
    this.router.navigate(['login']);
  }
}
