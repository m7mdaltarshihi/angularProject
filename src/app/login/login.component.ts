import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignIn } from '../DTOs/SignIn';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // username!:string

  form!: FormGroup
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {

  }
  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.form = this.formBuilder.group({

      txtUserName: ['', Validators.required],
      txtPassword: ['', Validators.required]
    })
  }
  login() {
    debugger
    if (this.form.valid) {

      var login = new SignIn();
      login.userName = this.form.value["txtUserName"]
      login.password = this.form.value["txtPassword"]


      this.userService.Login(login).subscribe({
        next: data => {
          debugger
          localStorage.setItem('SecurityKey', data.tokenValue)
          this.userService.GetUserRoles(this.form.value["txtUserName"]).subscribe({
            next: data => {
              debugger
              localStorage.setItem('UserRoles', data)
              this.userService.SearchByUserName(this.form.value["txtUserName"]).subscribe({
                next: data => {
                  localStorage.setItem('UserInfo', JSON.stringify(data))
                  debugger
                  this.router.navigate(['/home/dashboard'])
                }
              })
            }
          })
        }
      })
    }
  }
}