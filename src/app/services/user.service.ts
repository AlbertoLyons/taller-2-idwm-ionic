import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs'
import { UserData } from '../interfaces/users/user-data';
import { UserUpdate } from '../interfaces/users/user-update';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private errors: string[] = [];
  private baseUrl = "http://localhost:5225/api/user";
  constructor(private http: HttpClient) { }
  // Add the get all users (Admin only) method
  async getUsers(pageNumber: number): Promise<UserData> {
    try {
      const response = await firstValueFrom(
        this.http.get<UserData>(this.baseUrl + "/GetAll?pageNumber=" + pageNumber)
      );
      return Promise.resolve(response);
    } catch (error) {
      console.log('There was an error obtaining users', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
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

  getErrors(): string[] {
    return this.errors;
  }
}
