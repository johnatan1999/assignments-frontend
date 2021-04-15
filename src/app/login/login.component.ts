import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
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
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  showLoader = false;
  //  email = new FormControl('vetsorakotobe@gmail.com', [Validators.required, Validators.email]);
  // email = new FormControl('catleeslowan@gmail.com', [Validators.required, Validators.email]);
    //  password = new FormControl('password', [Validators.required]);
  

  constructor(private authService:AuthService, private router:Router) {
    const message = this.router.getCurrentNavigation()?.extras.state?.message;
    if(message) {

    }
  }

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
      this.showLoader = true;
      this.authService.logIn(this.email.value, this.password.value).subscribe((data) => {
        if(data.auth)
        {
          localStorage.setItem("user",JSON.stringify(data.user));
          this.router.navigate([this.authService.getHomePage()]);
          this.showLoader = false;
        } 
      }, (error) => {
        this.showLoader = false;
        this.checkUser.state = true;
      });
  }



 
}
