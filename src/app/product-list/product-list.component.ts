import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../DTOs/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../DTOs/Warehouse';
import Swal from 'sweetalert2';
import { count } from 'rxjs';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[]
  isDecending: boolean = false
  warehouses!: Warehouse[]
  count: number = 0
  productDetails?: Product
  enable: boolean = false
  @ViewChild('txtProductNameSearch') productName!: ElementRef
  constructor(private productService: ProductService, private router: Router, private warehouseService: WarehouseService) {



    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }
  }

  ngOnInit(): void {

    this.loadAllById()
  }

  loadAll() {
    this.productService.loadAll().subscribe({
      next: data => {
        this.products = data
      }
    })
  }

  loadAllById() {

    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }

    this.productService.loadAllById(warehouseId).subscribe({

      next: data => {

        this.products = data
        data.forEach((element: any) => {
          if (element.stock <= 10) {
            this.count++
          }
        });
      }
    })
  }

  editProduct(id: number) {
    this.router.navigate(['/home/newProduct'], { queryParams: { id: id } })
  }

  deleteProduct(id: number) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe({
          next: data => {
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success"
            });
            this.loadAllById()
          },

        })

      }
    });

  }

  loadById(id: number) {

    this.enable = true
    this.productService.loadById(id).subscribe({
      next: data => {
        this.productDetails = data

        const modalElement = document.getElementById('detailsModal');

        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        } else {
          console.error('Modal element not found!');
        }
      }
    });
  }


  search() {

    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }

    if (this.productName.nativeElement.value === "") {

      this.loadAllById()
    } else {



      this.productService.searchByProduct(this.productName.nativeElement.value, warehouseId).subscribe({
        next: data => {

          this.products = data
        }
      })
    }
  }

  stockSort() {

    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }
    this.productService.stockSort(this.isDecending, warehouseId).subscribe({

      next: data => {
        this.products = data
      }

    })
    if (this.isDecending) {
      this.isDecending = false
    } else {
      this.isDecending = true
    }
  }
  priceSort() {
    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }
    this.productService.priceSort(this.isDecending, warehouseId).subscribe({

      next: data => {
        this.products = data
      }

    })
    if (this.isDecending) {
      this.isDecending = false
    } else {
      this.isDecending = true
    }
  }

  belowStockThreshhold() {

    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }
    this.productService.getProductsLowOnStock(warehouseId).subscribe({

      next: data => {

        this.products = data
      }
    })
  }
  ResetFilters() {
    this.count = 0
    this.loadAllById()
  }
}
