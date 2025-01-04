import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { ProductData } from '../interfaces/products/product-data';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private errors: string[] = [];
  private baseUrl = environment.apiUrl + "/Cart";
  constructor(private http: HttpClient) { }
  async addProduct(productId: number): Promise<string> {
    try {
      return await firstValueFrom(
        this.http.post<string>(this.baseUrl + "/" + productId, {})
      );
    } catch (error) {
      console.error('There was an error adding the product:', error);
      if (error instanceof HttpErrorResponse) {
        this.errors.push(error.message);
      }
      throw error;
    }
  }
  
}
