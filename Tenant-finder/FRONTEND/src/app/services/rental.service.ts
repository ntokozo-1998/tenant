import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RentalService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient){}

  GetRentalCategories(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/category/getCategory').pipe();
  }

  GetRentalByUser(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/rental/getPostedRentalByUser').pipe();
  }

  GetAllPostedRental(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/rental/getPostedRental').pipe();
  }
  GetAllRental(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/rental/getRental').pipe();
  }

  CreateRental(rentalDetails:any): Observable<any> {
    console.log(rentalDetails)
    let API_URL = environment.REST_API + '/rental/createRental';
    return this.httpClient.post(API_URL, rentalDetails).pipe();
  }

  updateRental(id:any, data:any): Observable<any> {
    let API_URL = environment.REST_API + '/rental/updateRental/'+ id;
    return this.httpClient.put(API_URL, data).pipe();
  }

  deleteRental(id:any, status:any): Observable<any> {
  
    console.log(id, status);
    let API_URL = environment.REST_API + '/rental/deleteRental/'+id;
    return this.httpClient.put(API_URL, status).pipe();

}
}