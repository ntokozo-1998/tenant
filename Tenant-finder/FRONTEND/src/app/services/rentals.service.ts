import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  
  api = 'http://localhost:8080/api';
  token !: string;
  loggedInUsername !: string;

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }


  GetRentalsCategories(): Observable<any> {
    return this.httpClient.get(this.api + '/category/getCategory').pipe();
  }

  GetRentalsByUser(): Observable<any> {
    return this.httpClient.get(this.api + '/rentals/getPostedRentalsByUser').pipe();
  }

  GetAllPostedRentals(): Observable<any> {
    return this.httpClient.get(this.api + '/rentals/getPostedRentals').pipe();
  }
  GetAllRentals(): Observable<any> {
    return this.httpClient.get(this.api + '/rentals/getRentals').pipe();
  }

  CreateRentals(rentalsDetails:any): Observable<any> {
    console.log(rentalsDetails)
    let API_URL = this.api + '/rentals/createRentals';
    return this.httpClient.post(API_URL, rentalsDetails).pipe();
  }

  updateRentals(id:any, data:any): Observable<any> {
    let API_URL = this.api + '/rentals/updateRentals/'+ id;
    return this.httpClient.put(API_URL, data).pipe();
  }

  deleteRentals(id:any, status:any): Observable<any> {
  
    console.log(id, status);
    let API_URL = this.api + '/rentals/deleteRentals/'+id;
    return this.httpClient.put(API_URL, status).pipe();

    // return this.httpClient.get(environment.REST_API + '/livestock/deleteLivestock').pipe();
  }
  
}

