import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../DTOs/Warehouse';
import { UserService } from '../services/user.service';
import { Role } from '../DTOs/Role';
import { AddUser } from '../DTOs/AddUser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../DTOs/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private warehouseService: WarehouseService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  form!: FormGroup
  warehouses!: Warehouse[]
  roles!: Role[]
  isDisplay: boolean = true
  userId!: string
  isEdit: boolean = false
  ngOnInit(): void {
    this.buildForm()
    this.getWarehouses()
    this.getRoles()
    this.warehouseValidation()

    if (this.activatedRoute.snapshot.queryParams['userId'] != undefined) {
      this.userId = this.activatedRoute.snapshot.queryParams['userId']
      this.editUser()
      this.isEdit = true
    }

  }

  buildForm() {
    this.form = this.formBuilder.group({

      txtUserName: ['', Validators.required],
      txtName: ['', Validators.required],
      txtEmail: ['', Validators.compose([Validators.required, Validators.email])],
      selectRole: ['', Validators.required],
      txtPassword: ['', this.isEdit ? Validators.nullValidator : Validators.required],
      selectWarehouse: [''],
      txtId: ['']
    })

  }
  editUser() {
    debugger
    this.userService.loadById(this.userId).subscribe({
      next: data => {
        debugger
        this.form.controls['txtUserName'].setValue(data.userName)
        this.form.controls['txtName'].setValue(data.name)
        this.form.controls['txtEmail'].setValue(data.email)
        this.form.controls['selectRole'].setValue(data.roles)
        this.warehouseValidation()
        this.form.controls['txtPassword'].setValue(data.password)
        this.form.controls['selectWarehouse'].setValue(data.warehouseId)
        this.form.controls['txtId'].setValue(data.userId)

      }
    })
  }
  warehouseValidation() {
    debugger
    this.form.get('selectRole')?.valueChanges.subscribe(value => {
      if (value === 'Manager' || value === 'Admin') {
        this.isDisplay = false
      }
    });
  }

  getRoles() {
    this.userService.loadAllRoles().subscribe({

      next: data => {
        this.roles = data
      }
    })
  }
  getWarehouses() {

    this.warehouseService.LoadAll().subscribe({
      next: data => {
        this.warehouses = data
      }
    })
  }


  submit() {
    if (this.form.valid) {
      debugger
      var user = new AddUser();
      user.userName = this.form.value["txtUserName"]
      user.name = this.form.value["txtName"]
      user.email = this.form.value["txtEmail"]
      user.roleName = this.form.value["selectRole"]
      user.warehouseId = parseInt(this.form.value["selectWarehouse"])
      user.password = this.form.value["txtPassword"]


      this.userService.addUser(user).subscribe({
        next: data => {
          Swal.fire({
            title: "Saved Successfully",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Add More Users",
            denyButtonText: `Done`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.ngOnInit()
            } else if (result.isDenied) {
              this.router.navigate(['/home/userList'])
            }
          });
        }
      })
    }
  }

  update() {
    debugger
    if (this.form.valid) {

      var user = new User();
      user.userId = this.form.value["txtId"]
      user.userName = this.form.value["txtUserName"]
      user.name = this.form.value["txtName"]
      user.email = this.form.value["txtEmail"]
      user.roles = (this.form.value["selectRole"])
      user.warehouseId = parseInt(this.form.value["selectWarehouse"])
      // user.password = this.form.value["txtPassword"] // get form token later
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.userService.updateUser(user).subscribe({

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
