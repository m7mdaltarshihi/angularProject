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

    debugger

    var info = localStorage.getItem('UserInfo');

    // Check if 'info' exists (i.e., not null) and then parse it
    if (info) {
      var parsedInfo = JSON.parse(info); // Parse the string into an object
      var warehouseId = parsedInfo.warehouseId; // Access the warehouseId
      console.log(warehouseId); // Output the warehouseId
    } else {
      console.log('No user info found in localStorage');
    }
  }

  ngOnInit(): void {
    debugger
    this.LoadAllById()
  }

  loadAll() {
    this.productService.LoadAll().subscribe({

      next: data => {
        debugger
        this.products = data

      }
    })
  }
  LoadAllById() {
    debugger
    var info = localStorage.getItem('UserInfo');

    // Check if 'info' exists (i.e., not null) and then parse it
    if (info) {
      var parsedInfo = JSON.parse(info); // Parse the string into an object
      var warehouseId = parsedInfo.warehouseId; // Access the warehouseId
      console.log(warehouseId); // Output the warehouseId
    } else {
      console.log('No user info found in localStorage');
    }

    this.productService.LoadAllById(warehouseId).subscribe({

      next: data => {
        debugger
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
    debugger
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
        this.productService.Delete(id).subscribe({
          next: data => {
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success"
            });
            this.LoadAllById()
          },

        })

      }
    });

  }

  loadById(id: number) {
    debugger
    this.enable = true
    this.productService.LoadById(id).subscribe({
      next: data => {
        this.productDetails = data
        debugger
        // Get modal element
        const modalElement = document.getElementById('detailsModal');

        // Ensure modal element exists before trying to open
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show(); // Open the modal after loading the data
        } else {
          console.error('Modal element not found!');
        }
      },
      error: err => {
        console.error('Error loading product:', err);
      }
    });
  }


  Search() {

    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
      console.log(warehouseId);
    } else {
      console.log('No user info found in localStorage');
    }

    if (this.productName.nativeElement.value === "") {

      this.LoadAllById()
    } else {



      this.productService.SearchByProduct(this.productName.nativeElement.value, warehouseId).subscribe({
        next: data => {
          debugger
          this.products = data
          this.count = data.length
        }
      })
    }
  }

  StockSort() {

    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
      console.log(warehouseId);
    } else {
      console.log('No user info found in localStorage');
    }

    this.productService.StockSort(this.isDecending, warehouseId).subscribe({

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
  PriceSort() {
    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
      console.log(warehouseId);
    } else {
      console.log('No user info found in localStorage');
    }
    this.productService.PriceSort(this.isDecending, warehouseId).subscribe({

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

  BelowStockThreshhold() {
    debugger
    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
      console.log(warehouseId);
    } else {
      console.log('No user info found in localStorage');
    }
    this.productService.GetProductsLowOnStock(warehouseId).subscribe({

      next: data => {
        debugger
        this.products = data
      }
    })
  }
  ResetFilters() {
    this.count = 0
    this.LoadAllById()
  }
}
