import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth/auth';
import { firstValueFrom, map, Observable } from 'rxjs';
import { LoginDto } from '../interfaces/auth/login-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  public errors: string[] = [];

  async login(loginData: LoginDto): Promise<Auth> {
    try{
      const response = await firstValueFrom(this.http.post<Auth>(`${this.baseUrl}/auth/login`, loginData));
      return Promise.resolve(response);
    } catch (error) {
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || "Error desconocido");
      return Promise.reject(error);
    
    }
  }
}
