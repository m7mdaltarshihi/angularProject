import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../DTOs/User';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Role } from '../DTOs/Role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users!: User[]
  @ViewChild('txtNameSearch') name!: ElementRef
  @ViewChild('txtRoleName') roleName!: ElementRef
  user!: User
  roles!: Role[]
  roleForm!: FormGroup;
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {

    this.loadAll()
    this.getAllRoles()
    this.buildRoleForm()

  }

  buildRoleForm() {
    this.roleForm = this.formBuilder.group({
      txtRoleName: ['', Validators.required],
    });
  }
  saveRole() {
    if (this.roleForm.valid) {
    }
  }

  loadAll() {
    this.userService.loadAllUsers().subscribe({

      next: data => {
        this.users = data
      }
    })
  }

  editUser(id: string) {

    this.router.navigate(['/home/newUser'], { queryParams: { userId: id } })
  }

  deleteUser(id: string) {
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
        this.userService.delete(id).subscribe({
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

    if (this.name.nativeElement.value === "") {

      this.loadAll()
    } else {
      this.userService.searchByName(this.name.nativeElement.value).subscribe({
        next: data => {

          this.users = data

        }
      })
    }
  }
  getAllRoles() {
    this.userService.getAllRoles().subscribe({
      next: data => {
        this.roles = data
      }
    })
  }
  loadData(userName: string) {

    this.roleForm.controls["txtName"].setValue(userName)


  }
  addRole() {
    debugger
    var role = new Role()

    role.name = this.roleForm.controls["txtRoleName"].value

    this.userService.addRole(role).subscribe({
      next: data => {
        debugger
        Swal.fire({
          icon: "success",
          title: "Role Added",

        });



      }
    })
  }
  sortByRole(event: Event) {
    const selectedRole = (event.target as HTMLSelectElement).value;
    this.userService.sortByRole(selectedRole).subscribe({
      next: data => {
        this.users = data;
      }
    });
  }

}
