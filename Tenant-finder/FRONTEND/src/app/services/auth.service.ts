import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  api = 'http://localhost:8080/api';
  token !: string;
  loggedInUsername !: string;
  jwtHelper = new JwtHelperService;
  httpClient: any;

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.api+'/login',data);
  }

  register(data: any) {
    return this.http.post(this.api+'/register',data);
  }

  saveToken(token : string): void
  {
    this.token = token;
    sessionStorage.setItem('token',token);
  }

  forgotPassword(data: any) {
    return this.http.post(this.api+'/forgotPassword',data);
  }

  GetAllUsers(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/users/getUsers', this.httpOptions).pipe();
  }
}
