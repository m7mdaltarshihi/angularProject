import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { Order } from '../DTOs/Order';
import { Product } from '../DTOs/Product';
import { ProductService } from '../services/product.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private orderService: OrderService,
    private productService: ProductService, private activatedRoute: ActivatedRoute,
    private router: Router) {

  }
  form!: FormGroup
  products!: Product[]
  product!: Product
  orderId!: number
  isEdit: boolean = false
  productId!: number
  @ViewChild('productModal') productModal: any;
  ngOnInit(): void {

    this.formBuild()
    this.getAllProducts()
    this.form.controls['selectProduct'].disable();

    if (this.activatedRoute.snapshot.queryParams['id'] != undefined) {
      this.orderId = this.activatedRoute.snapshot.queryParams['id']
      this.isEdit = true
      this.LoadFormData()
    }
  }

  closeModal() {
    debugger
    // Initialize modal instance
    const modal = Modal.getInstance(this.productModal.nativeElement);
    if (modal) {
      modal.hide(); // Hide the modal
    }

    // Ensure proper cleanup after hiding the modal
    this.removeModalBackdrop();
    this.restoreBodyState();
  }

  private removeModalBackdrop() {
    // Remove all modal-backdrop elements (background dark shadow)
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
  }

  private restoreBodyState() {
    // Remove 'modal-open' class from body and reset styles
    document.body.classList.remove('modal-open');
    document.body.style.overflow = ''; // Reset body overflow style in case it's set to "hidden"
  }

  formBuild() {
    this.form = this.formBuilder.group({

      txtQuantity: ['', Validators.required],
      selectPaymentMethod: ['', Validators.required],
      txtShippingAddress: ['', Validators.required],
      txtCustomerName: ['', Validators.required],
      txtDate: ['', Validators.required],
      selectStatus: ['', Validators.required],
      selectProduct: ['', Validators.required],
      txtId: [''],

    })
  }

  getAllProducts() {
    this.productService.LoadAll().subscribe({
      next: data => {
        this.products = data
      }
    })
  }
  GetSelectedProduct(productId: number) {
    debugger
    this.productService.LoadById(productId).subscribe({
      next: data => {
        if (data != undefined) {

          this.product = data
          this.form.controls["selectProduct"].setValue(productId);
          this.closeModal()
        }
      }
    })
  }

  // formatDate(Date.now.toString(), 'yyyy-mm-dd', 'en')
  submit() {
    debugger
    if (this.form.valid) {
      var order = new Order();
      order.quantity = parseInt(this.form.value["txtQuantity"])
      order.paymentMethod = this.form.value["selectPaymentMethod"]
      order.shippingAddress = this.form.value["txtShippingAddress"]
      order.customerName = this.form.value["txtCustomerName"]
      order.status = this.form.value["selectStatus"]
      order.date = this.form.value["txtDate"]
      order.productid = this.product.productId


      this.orderService.Insert(order).subscribe({
        next: data => {
          Swal.fire({
            title: "Saved Successfully",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Add More Orders",
            denyButtonText: `Done`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.ngOnInit()
            } else if (result.isDenied) {
              this.router.navigate(['/home/orderList'])
            }
          });

        }
      })
    }

  }

  onClick() {
    console.log("test")
  }

  LoadFormData() {
    debugger
    this.orderService.LoadById(this.orderId).subscribe({
      next: data => {
        debugger
        this.form.controls['txtId'].setValue(data.orderId)
        this.form.controls['txtQuantity'].setValue(data.quantity)
        this.form.controls['selectPaymentMethod'].setValue(data.paymentMethod)
        this.form.controls['txtShippingAddress'].setValue(data.shippingAddress)
        this.form.controls['txtCustomerName'].setValue(data.customerName)
        this.form.controls['selectStatus'].setValue(data.status)
        this.form.controls['selectProduct'].setValue(data.productid)
        this.productId = data.productid
        this.form.controls['txtDate'].setValue(formatDate(data.date, 'yyyy-MM-dd', 'en'))

      }
    })
  }
  Update() {
    debugger
    if (this.form.valid) {
      var order = new Order();
      order.orderId = parseInt(this.form.value["txtId"])
      order.quantity = parseInt(this.form.value["txtQuantity"])
      order.paymentMethod = this.form.value["selectPaymentMethod"]
      order.shippingAddress = this.form.value["txtShippingAddress"]
      order.customerName = this.form.value["txtCustomerName"]
      order.status = this.form.value["selectStatus"]
      order.date = this.form.value["txtDate"]
      order.productid = this.productId

      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.orderService.Update(order).subscribe({

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
