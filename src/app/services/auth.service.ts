import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth/auth';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginDto } from '../interfaces/auth/login-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  public errors: string[] = [];

  login(loginData: LoginDto): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, loginData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error on login',error);
        this.errors.push(error.message || 'Error desconocido');
        return throwError(() => new Error('Error on login'));
    })
  );
  }
}
