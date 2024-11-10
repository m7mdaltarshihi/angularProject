import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../DTOs/Product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = ''
  constructor(private client: HttpClient) {

    this.baseUrl = environment.APIUrl
  }

  LoadAll(): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Product/GetAll`)
  }
  LoadAllById(warehouseId: number): Observable<any> {
    debugger
    return this.client.get(`${this.baseUrl}/api/Product/GetAllById?id=${warehouseId}`)
  }

  Insert(product: Product): Observable<any> {
    return this.client.post(`${this.baseUrl}/api/Product`, product)
  }

  Delete(id: number): Observable<any> {

    return this.client.delete(`${this.baseUrl}/api/Product?id=${id}`)
  }
  LoadById(id: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Product/LoadById?id=${id}`)
  }
  Update(product: Product): Observable<any> {

    return this.client.put(`${this.baseUrl}/api/Product`, product)
  }
  StockSort(sort: boolean, warehouseId: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Product/StockSort?sort=${sort}&id=${warehouseId}`)
  }
  PriceSort(sort: boolean, warehouseId: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Product/PriceSort?sort=${sort}&id=${warehouseId}`)
  }
  WarehouseFilter(id: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Product/WarehouseFilter?id=${id}`)
  }
  SearchByProduct(name: string, warehouseId: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Product/SearchByProduct?productName=${name}&id=${warehouseId}`)
  }
  getProductsByStock(stock: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Product?stock=${stock}`);
  }
  GetProductsLowOnStock(warehouseId: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Product/StockLevels?warehouseId=${warehouseId}`);
  }
}

