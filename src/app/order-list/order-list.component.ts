import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../DTOs/Order';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders!: Order[]
  isDecending: boolean = false
  @ViewChild('txtCustomerNameSearch') customerName!: ElementRef
  constructor(private orderService: OrderService, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {


    this.loadAll()
  }

  loadFormData(id: number) {

    this.router.navigate(['/home/newOrder'], { queryParams: { id: id } })
  }

  loadAll() {
    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }
    this.orderService.loadAllById(warehouseId).subscribe({

      next: data => {
        this.orders = data
      }
    })
  }
  deleteOrder(orderId: number) {
    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }
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
        this.orderService.delete(orderId).subscribe({
          next: data => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        })

      }
      setTimeout(() => this.loadAll(), 200);
    });

  }
  resetFilters() {
    this.loadAll()
  }
  search() {
    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }
    if (this.customerName.nativeElement.value === "") {

      this.loadAll()
    } else {
      this.orderService.searchByCustomer(this.customerName.nativeElement.value, warehouseId).subscribe({
        next: data => {

          this.orders = data

        }
      })
    }

  }

  dateSort() {

    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }
    this.orderService.dateSort(this.isDecending, warehouseId).subscribe({

      next: data => {
        this.orders = data
      }
    })
    if (this.isDecending) {
      this.isDecending = false
    } else {
      this.isDecending = true
    }
  }

  statusSort(event: Event) {
    var info = localStorage.getItem('UserInfo');

    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
    }
    const status = (event.target as HTMLSelectElement).value
    this.orderService.sortByStatus(status, warehouseId).subscribe({
      next: data => {
        this.orders = data
      }
    })
  }




}
