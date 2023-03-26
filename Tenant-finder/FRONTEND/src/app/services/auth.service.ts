import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'http://localhost:8080/api';
  token !: string;
  loggedInUsername !: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  httpClient: any;
  

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.api+'/users/login',data);
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

  GetAllUsers(): Observable<any> {
    return this.httpClient.get(this.api+'/users/getUsers', this.httpOptions).pipe();
  }

  updateUser(id: any, data: any): Observable<any> {
    let API_URL = this.api+ '/users/updateUsers/'+id;
    return this.httpClient.put(API_URL, data).pipe();
  }

  DeleteUser(id: any, data: any): Observable<any> {
    console.log(data)
    let API_URL = this.api+ '/users/deleteUser/'+id;
    return this.httpClient.put(API_URL, data).pipe();
  }
  
}

