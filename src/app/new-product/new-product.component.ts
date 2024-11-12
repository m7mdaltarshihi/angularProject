import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../DTOs/Product';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../DTOs/Warehouse';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private warehouseService: WarehouseService, private activatedRouter: ActivatedRoute,
    private router: Router) {

  }
  form!: FormGroup
  warehouse!: Warehouse
  warehouseId!: number
  productId!: number
  isEdit: boolean = false
  imgUrl: any
  ngOnInit(): void {

    this.buildForm();
    this.getWarehouses();
    if (this.activatedRouter.snapshot.queryParams['id'] != undefined) {

      this.productId = this.activatedRouter.snapshot.queryParams['id']
      this.isEdit = true
      this.loadData()
    }
  }

  buildForm() {

    this.form = this.formBuilder.group({
      txtName: ['', Validators.required],
      txtPrice: ['0', Validators.required],
      txtSKU: ['', Validators.required],
      txtDescription: [''],
      txtStock: ['', Validators.required],
      fileImage: [''],
      selectWarehouse: ['', Validators.required],
      txtId: ['']
    })
  }

  loadData() {

    this.productService.loadById(this.productId).subscribe({
      next: data => {
        debugger
        this.form.controls['txtName'].setValue(data.name)
        this.form.controls['txtPrice'].setValue(data.price)
        this.form.controls['txtSKU'].setValue(data.sku)
        this.form.controls['txtDescription'].setValue(data.description)
        this.form.controls['txtStock'].setValue(data.stock)
        this.imgUrl = data.image
        this.form.controls['selectWarehouse'].setValue(data.warehouseId)
        this.form.controls['txtId'].setValue(data.productId)
      }
    })
  }

  getWarehouses() {
    debugger
    var info = localStorage.getItem('UserInfo');
    if (info) {
      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId;
      this.warehouseService.loadById(warehouseId).subscribe({
        next: data => {
          debugger
          this.warehouse = data
          this.form.controls["selectWarehouse"].setValue(data.warehouseId)
        }
      })
    }

  }
  onFileSelect(file: any) {

    let reader = new FileReader()
    reader.readAsDataURL(file.target.files[0])
    reader.onload = (_event) => {
      this.imgUrl = reader.result
    }
  }

  submit() {

    if (this.form.valid) {

      var product = new Product();
      debugger
      product.name = this.form.value["txtName"]
      product.price = parseFloat(this.form.value["txtPrice"])
      product.sku = this.form.value["txtSKU"]
      product.description = this.form.value["txtDescription"]
      product.stock = parseInt(this.form.value["txtStock"])
      product.image = this.imgUrl
      product.warehouseId = parseInt(this.form.value["selectWarehouse"])

      this.productService.insert(product).subscribe({
        next: data => {
          Swal.fire({
            title: "Saved Successfully",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Add More Products",
            denyButtonText: `Done`
          }).then((result) => {
            if (result.isConfirmed) {
              this.ngOnInit()
            } else if (result.isDenied) {
              this.router.navigate(['/home/productList'])
            }
          });
        }
      })
    }
  }

  update() {

    if (this.form.valid) {



      var product = new Product();

      product.productId = this.form.value["txtId"]
      product.name = this.form.value["txtName"]
      product.price = parseFloat(this.form.value["txtPrice"])
      product.sku = this.form.value["txtSKU"]
      product.description = this.form.value["txtDescription"]
      product.stock = parseInt(this.form.value["txtStock"])
      product.image = this.imgUrl
      product.warehouseId = parseInt(this.form.value["selectWarehouse"])

      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.update(product).subscribe({

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
}
