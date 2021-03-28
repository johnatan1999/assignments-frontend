import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

export class CheckUser {
  loginError = "Login Failed: Your email or password is incorrect"
  state = false;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkUser: CheckUser = new CheckUser();
  hide = true;
  email = new FormControl('john@gmail.com', [Validators.required, Validators.email]);
  password = new FormControl('john', [Validators.required]);
  

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {

  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
  }


  doLogin() {
    // si je suis pas loggé, je me loggue, sinon, si je suis
    // loggé je me déloggue et j'affiche la page d'accueil
    if((!this.email.value) || (!this.password.value)) return;
   /* if(this.authService.loggedIn) {
      // je suis loggé
      // et bien on se déloggue
      this.authService.logOut();
      // on navigue vers la page d'accueil
      this.router.navigate(["/home"]);
    } else {*/
      // je ne suis pas loggé, je me loggue
      this.authService.logIn(this.email.value, this.password.value).subscribe((data) => {
        console.log("login", data)
        if(data.auth) this.router.navigate(["/assignments"]);
      }, (error) => {
        this.checkUser.state = true;
      });
  }



 
}
