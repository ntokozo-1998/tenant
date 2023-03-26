import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  api = 'http://localhost:8080/api';
  token !: string;
  loggedInUsername !: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  
  GetAllCategory(): Observable<any> {
    return this.httpClient.get(this.api+ '/category/getCategory', this.httpOptions).pipe();
  }

  createCategory(categoryDetails:any): Observable<any> {
    let API_URL = this.api + '/category/createCategory';
    return this.httpClient.post(API_URL, categoryDetails).pipe();
  }


  updateCategory(id: any, categoryDetails: any): Observable<any> {
    let API_URL = this.api + '/category/updateCategory/'+id;
    return this.httpClient.put(API_URL, categoryDetails).pipe();
  }

  DeleteCategory(id: any, data: any): Observable<any> {
    console.log(data)
    let API_URL = this.api + '/users/deleteUser/'+id;
    return this.httpClient.put(API_URL, data).pipe();
  }
}
