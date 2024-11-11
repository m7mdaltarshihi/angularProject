import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Menu } from '../Menu';
import { User } from '../DTOs/User';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  liMenu: any = []
  filteredMenu: any = []
  roles!: string[]
  name!: string
  user!: User
  @ViewChild('language') language!: ElementRef


  constructor(private activatedRoute: ActivatedRoute, private router: Router
    , private translateService: TranslateService
  ) {
    this.liMenu = Menu;
    debugger
    const storedRoles = localStorage.getItem("UserRoles");

    if (storedRoles) {
      try {
        this.roles = JSON.parse(storedRoles);
      } catch (e) {
        this.roles = storedRoles.split(',').map(role => role.trim());
      }
    } else {
      this.roles = [];
    }

    // Loop through each role to filter the menu
    this.roles.forEach((role: string) => {
      this.liMenu.forEach((element: any) => {
        // Ensure element.role is an array before using .find
        let rolesArray = Array.isArray(element.role) ? element.role : element.role.split(',');

        // Check if the menu item has a matching role
        const isInRole = rolesArray.find((x: any) => x === role);

        if (isInRole !== undefined) {
          // If the role matches, add the menu item to the filtered list
          this.filteredMenu.push(element);
        }
      });
    });


    const storedUser = localStorage.getItem('UserInfo')
    if (storedUser) {
      this.user = JSON.parse(storedUser)
      console.log(this.user)

    }
  }
  @ViewChild('view') goToView!: ElementRef
  ngOnInit(): void {
    // this.name = this.activatedRoute.snapshot.queryParams["username"]
  }
  changeLanguage() {
    this.translateService.use(this.language.nativeElement.value);

    const body = document.getElementsByTagName('body')[0];


    if (this.language.nativeElement.value === 'ar') {
      body.dir = 'rtl';
      body.style.textAlign = 'right';
    } else {
      body.dir = 'ltr';
      body.style.textAlign = 'left';
    }
  }

  viewAll(view: string) {
    this.router.navigate([`/home/${view}`]);
  }

  Logout() {

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("SecurityKey")
        localStorage.removeItem("UserRoles")
        localStorage.removeItem("UserInfo")
        this.router.navigate(['/'])
      }
    });
  }
}
