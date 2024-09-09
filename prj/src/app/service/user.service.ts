import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'https://localhost:7000/api/Users'

  constructor(private _http: HttpClient) { }

  getUserListFromServer(): Observable<User[]> {
    return this._http.get<User[]>(this.baseURL)
  }

  getUserByIdFromServer(id: number): Observable<User> {
    return this._http.get<User>(this.baseURL + "/" + id);
  }

  addUserFromServer(newUser: User): Observable<User> {
    return this._http.post<User>(this.baseURL, newUser)
  }
}
