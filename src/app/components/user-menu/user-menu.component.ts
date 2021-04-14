import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  user: User;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = AuthService.getUserFromLS();
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
}
