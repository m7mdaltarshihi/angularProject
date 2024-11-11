import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../DTOs/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ChangePassword } from '../DTOs/ChangePassword';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User
  isEdit: boolean = false
  form!: FormGroup
  passwordForm!: FormGroup
  changePassword!: ChangePassword
  imgUrl: any
  isDisplay: boolean = true

  constructor(private formBuilder: FormBuilder, private userService: UserService) {

    const storedUser = localStorage.getItem('UserInfo')
    if (storedUser) {
      this.user = JSON.parse(storedUser)

    }
  }

  ngOnInit(): void {
    this.isEdit = false
    this.buildForm()
    this.buildPasswordForm()
    this.fillData()
  }
  fillData() {

    this.form.controls['txtName'].setValue(this.user.name)
    this.form.controls['txtEmail'].setValue(this.user.email)
    this.form.controls['txtUserName'].setValue(this.user.userName)
    this.form.controls['fileImage'].setValue(this.user.image)
    this.form.disable()
  }

  buildForm() {
    this.form = this.formBuilder.group({
      txtUserName: [''],
      txtName: [''],
      fileImage: [''],
      txtEmail: ['']
    })
  }
  buildPasswordForm() {
    this.passwordForm = this.formBuilder.group({

      currentPassword: [''],
      newPassword: ['']
    })
  }
  ResetPassword() {

    if (this.passwordForm.value) {
      var changePassword = new ChangePassword()
      changePassword.userId = this.user.userId
      changePassword.currentPassword = this.passwordForm.controls['currentPassword'].value
      changePassword.newPassword = this.passwordForm.controls['newPassword'].value
      this.userService.changePassword(changePassword).subscribe({
        next: data => {
          Swal.fire({
            icon: "success",
            title: "Password Updated",

          });
          this.ngOnInit()
        }
      })
    }
  }
  EditProfile() {

    this.form.enable()
    this.form.controls["txtUserName"].disable()
    this.isEdit = true
    this.isDisplay = false
  }
  onFileSelect(file: any) {

    let reader = new FileReader()
    reader.readAsDataURL(file.target.files[0])
    reader.onload = (_event) => {

      this.imgUrl = reader.result
    }
  }

  Update() {

    this.user.name = this.form.controls['txtName'].value
    this.user.email = this.form.controls['txtEmail'].value
    this.user.userName = this.form.controls['txtUserName'].value
    if (this.imgUrl) {
      this.user.image = this.imgUrl;
    }



    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.update(this.user).subscribe({

          next: data => {
            Swal.fire("Updated Successfuly!", "", "success");

            localStorage.removeItem('userInfo')
            localStorage.setItem('UserInfo', JSON.stringify(this.user))
            this.isEdit = false
            this.form.disable()

          }

        })

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}
