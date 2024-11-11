import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Warehouse } from '../DTOs/Warehouse';
import { Product } from '../DTOs/Product';
import { User } from '../DTOs/User';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { WarehouseService } from '../services/warehouse.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalUsers = 0;
  recentUsers: User[] = [];
  totalOrders = 0;
  ordersPending = 0;
  ordersDelivered = 0;
  ordersCancelled = 0;
  totalProducts = 0;
  lowProducts: Product[] = [];
  totalWarehouses = 0;
  warehouses: Warehouse[] = [];
  constructor(private userService: UserService,
    private orderService: OrderService, private productService: ProductService,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit(): void {
    this.GetUsersCount()
    this.fetchOrderData()
    this.fetchWarehouseData()
    this.fetchProductData()
  }

  GetUsersCount() {
    this.userService.loadAllUsers().subscribe(users => {
      this.totalUsers = users.length;
      this.recentUsers = users.slice(-3);
    });
  }

  fetchOrderData() {
    this.orderService.loadAll().subscribe(orders => {
      this.totalOrders = orders.length;
      this.ordersPending = orders.filter((order: any) => order.status === 'Pending').length;
      this.ordersDelivered = orders.filter((order: any) => order.status === 'Delivered').length;
      this.ordersCancelled = orders.filter((order: any) => order.status === 'Cancelled').length;
    });
  }
  fetchProductData() {
    this.productService.LoadAll().subscribe(products => {
      this.totalProducts = products.length;
      products.forEach((element: any) => {
        if (element.stock <= 10) {
          this.lowProducts.push(element)
        }
      });
    });
  }
  fetchWarehouseData() {
    this.warehouseService.LoadAll().subscribe(warehouses => {
      this.totalWarehouses = warehouses.length;
      this.warehouses = warehouses.map((warehouse: any) => ({
        ...warehouse,
        capacityUsage: (warehouse.currentCapacity / warehouse.maxCapacity) * 100
      }));
    });
  }
}