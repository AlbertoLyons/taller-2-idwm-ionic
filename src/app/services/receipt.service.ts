import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { ReceiptData } from '../interfaces/receipts/receipt-data';
@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private errors: string[] = [];
  private baseUrl = environment.apiUrl + "/receipts";
  constructor(private http: HttpClient) { }
    async getReceipts(): Promise<ReceiptData> {
      try {
        const response = await firstValueFrom(
          this.http.get<ReceiptData>(this.baseUrl + "/GetOrderhistory")
        );
        return Promise.resolve(response);
      } catch (error) {
        console.log('There was an error obtaining receipts', error);
        let e = error as HttpErrorResponse;
        this.errors.push(e.message);
        return Promise.reject(error);
      }
    }
}
