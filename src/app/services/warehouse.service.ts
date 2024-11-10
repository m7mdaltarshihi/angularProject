import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse } from '../DTOs/Warehouse';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  baseUrl = ''
  constructor(private client: HttpClient) {

    this.baseUrl = environment.APIUrl
  }

  LoadAll(): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Warehouse/LoadAll`)
  }
  loadAllById(warehouseId: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Warehouse/LoadAllById?wareouseId=${warehouseId}`)
  }
  insert(warehouse: Warehouse): Observable<any> {

    return this.client.post(`${this.baseUrl}/api/Warehouse`, warehouse)
  }

  DeleteWarehouse(id: number): Observable<any> {

    return this.client.delete(`${this.baseUrl}/api/Warehouse?id=${id}`)
  }
  LoadById(id: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Warehouse/LoadById?id=${id}`)
  }

  UpdateWarehouse(warehouse: Warehouse): Observable<any> {

    return this.client.put(`${this.baseUrl}/api/Warehouse`, warehouse)
  }
  FilterByStatus(stats: boolean): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Warehouse/FilterByStatus?isActive=${stats}`)
  }
  SortByCapacity(isDecending: boolean): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Warehouse/SortByCapacity?isDecending=${isDecending}`)
  }
  SearchByLocation(location: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Warehouse/SearchByLocation?location=${location}`)
  }
}
