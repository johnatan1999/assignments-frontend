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

  defaultImage;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = AuthService.getUserFromLS();
    const tmp = this.user.name.split(' ');
    this.user.name = tmp[0];
    this.defaultImage = `${tmp[0][0]}${tmp[1][0]}`
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
}
