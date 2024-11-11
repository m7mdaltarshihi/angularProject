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

  loadAll(): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Warehouse/LoadAll`)
  }
  loadAllById(warehouseId: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Warehouse/LoadAllById?wareouseId=${warehouseId}`)
  }
  insert(warehouse: Warehouse): Observable<any> {

    return this.client.post(`${this.baseUrl}/api/Warehouse`, warehouse)
  }

  delete(id: number): Observable<any> {

    return this.client.delete(`${this.baseUrl}/api/Warehouse?id=${id}`)
  }
  loadById(id: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Warehouse/LoadById?id=${id}`)
  }

  update(warehouse: Warehouse): Observable<any> {

    return this.client.put(`${this.baseUrl}/api/Warehouse`, warehouse)
  }
  filterByStatus(stats: boolean): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Warehouse/FilterByStatus?isActive=${stats}`)
  }
  sortByCapacity(isDecending: boolean): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Warehouse/SortByCapacity?isDecending=${isDecending}`)
  }
  searchByLocation(location: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Warehouse/SearchByLocation?location=${location}`)
  }
}
