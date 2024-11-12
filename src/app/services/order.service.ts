import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../DTOs/Order';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = ''
  constructor(private client: HttpClient) {

    this.baseUrl = environment.APIUrl
  }
  loadAll(): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Order/GetAll`)
  }
  loadAllById(id: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Order/GetAllById?id=${id}`)
  }
  insert(order: Order): Observable<any> {
    return this.client.post(`${this.baseUrl}/api/Order`, order)

  }
  delete(id: number): Observable<any> {

    return this.client.delete(`${this.baseUrl}/api/Order?id=${id}`)
  }
  loadById(id: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Order/LoadById?id=${id}`)
  }
  update(order: Order): Observable<any> {

    return this.client.put(`${this.baseUrl}/api/Order`, order)

  }
  dateSort(isDecending: boolean, id: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Order/DateSort?sort=${isDecending}&id=${id}`)
  }
  searchByCustomer(customerName: string, id: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Order/SearchByCustomer?customerName=${customerName}&id=${id}`)
  }
  sortByStatus(status: string, id: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Order/SortByStatus?status=${status}&id=${id}`)
  }
}
