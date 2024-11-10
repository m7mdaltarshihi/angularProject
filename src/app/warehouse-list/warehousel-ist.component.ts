import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../DTOs/Warehouse';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warehousel-ist',
  templateUrl: './warehousel-ist.component.html',
  styleUrls: ['./warehousel-ist.component.css']
})
export class WarehouselIstComponent implements OnInit {
  warehouses!: Warehouse[]
  isDecending: boolean = false
  @ViewChild('txtLocationSearch') location!: ElementRef
  constructor(private warehouseService: WarehouseService, private router: Router) { }
  ngOnInit(): void {

    this.loadAll()

  }

  loadAll() {
    this.warehouseService.LoadAll().subscribe({

      next: data => {
        this.warehouses = data
      }
    })
  }
  editWarehouse(id: number) {
    this.router.navigate(['/home/newWarehouse'], { queryParams: { id: id } })
  }

  deleteWarehouse(warehouseId: number) {
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
        this.warehouseService.DeleteWarehouse(warehouseId).subscribe({
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
    debugger
    if (this.location.nativeElement.value === "") {

      this.loadAll()
    } else {

      this.warehouseService.SearchByLocation(this.location.nativeElement.value).subscribe({
        next: data => {
          debugger
          this.warehouses = data
        }
      })
    }
  }
  SortByCpacity() {

    this.warehouseService.SortByCapacity(this.isDecending).subscribe({
      next: data => {
        this.warehouses = data
      }
    })
    if (this.isDecending) {
      this.isDecending = false
    } else {
      this.isDecending = true
    }

  }
  FilterByStatus(event: Event) {
    debugger
    let status = (event.target as HTMLSelectElement).value

    this.warehouseService.FilterByStatus(this.parseBoolean(status)).subscribe({
      next: data => {
        this.warehouses = data
      }
    })
  }

  private parseBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  }
}