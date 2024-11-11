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

  loadAll(): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Product/GetAll`)
  }
  loadAllById(warehouseId: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Product/GetAllById?id=${warehouseId}`)
  }

  insert(product: Product): Observable<any> {
    return this.client.post(`${this.baseUrl}/api/Product`, product)
  }

  delete(id: number): Observable<any> {

    return this.client.delete(`${this.baseUrl}/api/Product?id=${id}`)
  }
  loadById(id: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Product/LoadById?id=${id}`)
  }
  update(product: Product): Observable<any> {

    return this.client.put(`${this.baseUrl}/api/Product`, product)
  }
  stockSort(sort: boolean, warehouseId: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Product/StockSort?sort=${sort}&id=${warehouseId}`)
  }
  priceSort(sort: boolean, warehouseId: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Product/PriceSort?sort=${sort}&id=${warehouseId}`)
  }
  warehouseFilter(id: number): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Product/WarehouseFilter?id=${id}`)
  }
  searchByProduct(name: string, warehouseId: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Product/SearchByProduct?productName=${name}&id=${warehouseId}`)
  }
  getProductsByStock(stock: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Product?stock=${stock}`);
  }
  getProductsLowOnStock(warehouseId: number): Observable<any> {
    return this.client.get(`${this.baseUrl}/api/Product/StockLevels?warehouseId=${warehouseId}`);
  }
}

