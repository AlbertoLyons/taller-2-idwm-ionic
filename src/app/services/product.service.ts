import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { ProductData } from '../interfaces/products/product-data';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private errors: string[] = [];
  private baseUrl = environment.apiUrl + "/products";
  constructor(private http: HttpClient) { }
    async getProducts(pageNumber: number, sortOrder: string, type: string, name: string): Promise<ProductData> {
      try {
        const response = await firstValueFrom(
          this.http.get<ProductData>(this.baseUrl + "/GetAll?AscOrDesc=" + sortOrder + "&pageNumber=" + pageNumber + "&type=" + type + "&name=" + name)
        );
        return Promise.resolve(response);
      } catch (error) {
        console.log('There was an error obtaining users', error);
        let e = error as HttpErrorResponse;
        this.errors.push(e.message);
        return Promise.reject(error);
      }
    }
}
