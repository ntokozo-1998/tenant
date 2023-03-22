import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'http://localhost:8080/api';
  token !: string;
  loggedInUsername !: string;

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.api+'/login',data);
  }

  register(data: any) {
    return this.http.post(this.api+'/users/register',data);
  }

  saveToken(token : string): void
  {
    this.token = token;
    sessionStorage.setItem('token',token);
  }

  forgotPassword(data: any) {
    return this.http.post(this.api+'/forgotPassword',data);
  }
}

