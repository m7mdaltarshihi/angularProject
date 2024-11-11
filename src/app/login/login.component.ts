import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignIn } from '../DTOs/SignIn';
import { UserService } from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form!: FormGroup
  @ViewChild('language') language!: ElementRef
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService,
    private translate: TranslateService
  ) {

  }
  ngOnInit(): void {
    this.buildForm()
  }

  changeLanguage() {
    this.translate.use(this.language.nativeElement.value);

    const body = document.getElementsByTagName('body')[0];


    if (this.language.nativeElement.value === 'ar') {
      body.dir = 'rtl';
      body.style.textAlign = 'right';
    } else {
      body.dir = 'ltr';
      body.style.textAlign = 'left';
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({

      txtUserName: ['', Validators.required],
      txtPassword: ['', Validators.required]
    })
  }
  login() {

    if (this.form.valid) {

      var login = new SignIn();
      login.userName = this.form.value["txtUserName"]
      login.password = this.form.value["txtPassword"]


      this.userService.login(login).subscribe({
        next: data => {

          localStorage.setItem('SecurityKey', data.tokenValue)
          this.userService.getUserRoles(this.form.value["txtUserName"]).subscribe({
            next: data => {

              localStorage.setItem('UserRoles', data)
              this.userService.searchByUserName(this.form.value["txtUserName"]).subscribe({
                next: data => {
                  localStorage.setItem('UserInfo', JSON.stringify(data))

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