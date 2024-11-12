import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Warehouse } from '../DTOs/Warehouse';
import { WarehouseService } from '../services/warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../DTOs/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.css']
})
export class NewWarehouseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private warehouseService: WarehouseService, private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  form!: FormGroup
  isEdit: boolean = false
  warehouseId!: number




  ngOnInit(): void {

    this.buildForm()

    if (this.activatedRoute.snapshot.queryParams['id'] != undefined) {

      this.warehouseId = this.activatedRoute.snapshot.queryParams['id']
      this.editWarehouse()
      this.isEdit = true
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      txtLocation: ['', Validators.required],
      txtManager: ['', Validators.required],
      txtCapacity: ['', Validators.required],
      txtStatus: ['', Validators.required],
      txtId: [''],
      usedCapacity: ['']
    })
  }

  editWarehouse() {

    this.warehouseService.loadById(this.warehouseId).subscribe({
      next: data => {

        this.form.controls['txtId'].setValue(data.warehouseId)
        this.form.controls['txtLocation'].setValue(data.location)
        this.form.controls['txtManager'].setValue(data.manager)
        this.form.controls['txtCapacity'].setValue(data.maxCapacity)
        this.form.controls['txtStatus'].setValue(data.status)
        this.form.controls['usedCapacity'].setValue(data.currentCapacity)

      }
    })
  }
  submit() {

    if (this.form.valid) {
      var warehouse = new Warehouse();
      warehouse.location = this.form.value["txtLocation"]
      warehouse.manager = this.form.value["txtManager"]
      warehouse.maxCapacity = parseInt(this.form.value["txtCapacity"])
      warehouse.status = this.parseBoolean(this.form.value["txtStatus"]);
      this.warehouseService.insert(warehouse).subscribe({
        next: data => {
          Swal.fire({
            title: "Saved Successfully",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Add More Warehouses",
            denyButtonText: `Done`
          }).then((result) => {
            if (result.isConfirmed) {
              this.ngOnInit()
            } else if (result.isDenied) {
              this.router.navigate(['/home/warehouseList'])
            }
          });
        }
      });
    }
  }

  update() {

    if (this.form.valid) {
      var warehouse = new Warehouse();
      warehouse.warehouseId = this.form.value["txtId"]
      warehouse.location = this.form.value["txtLocation"]
      warehouse.manager = this.form.value["txtManager"]
      warehouse.maxCapacity = this.form.value["txtCapacity"]
      warehouse.status = this.parseBoolean(this.form.value["txtStatus"]);
      warehouse.currentCapacity = this.form.value["usedCapacity"]


      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          this.warehouseService.update(warehouse).subscribe({

            next: data => {
              Swal.fire("Updated Successfuly!", "", "success");
            }
          })

        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  }

  private parseBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  }

}

