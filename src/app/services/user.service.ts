import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs'
import { UserData } from '../interfaces/users/user-data';
import { UserUpdate } from '../interfaces/users/user-update';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private errors: string[] = [];
  private baseUrl = environment.apiUrl + "/user";
  constructor(private http: HttpClient) { }
  // Add the update user (User only) method
  async updateUser(user: UserUpdate, id: number): Promise<UserUpdate> {
    try {
      const response = await firstValueFrom(
        this.http.put<UserUpdate>(this.baseUrl + "/" + id, user)
      );
      return Promise.resolve(response);
    } catch (error) {
      console.log('There was an error saving the user', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
  async deleteUser(id: number): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.delete(this.baseUrl + "/" + id + "/DeleteUser", { responseType: 'text' })
      );
      console.log('User deleted successfully:', response); // Maneja el texto aquí si es necesario
      return Promise.resolve(response);
    } catch (error) {
      console.error('There was an error deleting the user:', error);
      const e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
  
  getErrors(): string[] {
    return this.errors;
  }
}
