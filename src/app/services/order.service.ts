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

  Insert(order: Order): Observable<any> {
    return this.client.post(`${this.baseUrl}/api/Order`, order)

  }
  Delete(id: number): Observable<any> {
    debugger
    return this.client.delete(`${this.baseUrl}/api/Order?id=${id}`)
  }
  LoadById(id: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Order/LoadById?id=${id}`)
  }
  Update(order: Order): Observable<any> {
    debugger
    return this.client.put(`${this.baseUrl}/api/Order`, order)

  }
  DateSort(isDecending: boolean): Observable<any> {
    debugger
    return this.client.get(`${this.baseUrl}/api/Order/DateSort?sort=${isDecending}`)
  }
  SearchByCustomer(customerName: string): Observable<any> {
    debugger
    return this.client.get(`${this.baseUrl}/api/Order/SearchByCustomer?customerName=${customerName}`)
  }
  SortByStatus(status: string): Observable<any> {
    debugger
    return this.client.get(`${this.baseUrl}/api/Order/SortByStatus?status=${status}`)
  }
}
