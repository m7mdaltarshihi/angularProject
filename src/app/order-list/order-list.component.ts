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

    // let order = this.orders.map(e => ({

    //   ID: e.OrderId,
    //   Quantity: e.Quantity,
    //   PaymentMethod: e.PaymentMethod.toUpperCase(),
    //   ShippingAddress: e.ShippingAddress,
    //   CustomerName: e.CustomerName,
    //   Status: e.Status
    // }))
    this.loadAll()
  }

  LoadFormData(id: number) {
    debugger
    this.router.navigate(['/home/newOrder'], { queryParams: { id: id } })
  }

  loadAll() {
    this.orderService.loadAll().subscribe({

      next: data => {
        this.orders = data
      }
    })
  }
  deleteOrder(orderId: number) {
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
        this.orderService.Delete(orderId).subscribe({
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
  ResetFilters() {
    this.loadAll()
  }
  Search() {

    if (this.customerName.nativeElement.value === "") {

      this.loadAll()
    } else {
      this.orderService.SearchByCustomer(this.customerName.nativeElement.value).subscribe({
        next: data => {

          this.orders = data

        }
      })
    }

  }

  DateSort() {
    debugger
    this.orderService.DateSort(this.isDecending).subscribe({

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

  StatusSort(event: Event) {
    debugger
    const status = (event.target as HTMLSelectElement).value
    this.orderService.SortByStatus(status).subscribe({
      next: data => {
        this.orders = data
      }
    })
  }




}
