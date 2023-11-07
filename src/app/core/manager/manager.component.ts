import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityContextHolder } from 'src/app/utils/apis/security/security-context-holder';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html'
})
export class ManagerComponent implements OnInit {

  heightValue = 'calc(100% - 355px)'
  currentUser: any

  constructor(private context: SecurityContextHolder, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.context.activeUser.role
    if(this.context.activeUser.role == 'Admin')
      this.heightValue = 'calc(100% - 397px)'
  }

  logout() {
    this.context.signOut()
    this.router.navigate(['/public', 'home'])
  }

}
