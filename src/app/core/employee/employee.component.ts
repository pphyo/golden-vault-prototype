import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SecurityContextHolder } from 'src/app/utils/apis/security/security-context-holder';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  isCheckoutView = false
  heightValue = 'calc(100% - 360px)'
  currentUser: any

  constructor(private context: SecurityContextHolder,
    private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.context.activeUser.role
    if(this.currentUser == 'Admin')
      this.heightValue = 'calc(100% - 495px)'

    if(this.currentUser == 'Manager')
      this.heightValue = 'calc(100% - 452px)'

    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        if(e.url == '/employee/sale/checkout') {
          this.isCheckoutView = true
        } else {
          this.isCheckoutView = false
        }
      }
    })
  }

  logOut() {
    this.context.signOut()
    this.router.navigate(['/public'])
  }

}
