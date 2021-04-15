import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BasicService } from './basic.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BasicService {

  public static ADMIN = "admin";

  public static ELEVE = "eleve";

  public static PROFESSEUR = "professeur";

  public static HOME_ELEVE = "/assignments";

  public static HOME_ADMIN = "/assignments/dashboard";

  constructor(private http:HttpClient) { super(); }

  logIn(login, password) {
    // typiquement, acceptera en paramètres un login et un password
    // vérifier qu'ils sont ok, et si oui, positionner la propriété loggedIn à true
    // si login/password non valides, positionner à false;

    /*if (login === 'admin') this.admin = true;

    this.loggedIn = true;*/

    const user = {
      email: login,
      password: password
    }

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(user);
    return this.http.post<any>(this.getUri('/login'), body, { 'headers': headers })
      .pipe(
        retry(1),
        catchError(this.handleError) //fonction mandray fonction
      );
  }


  // exemple d'utilisation :
  // isAdmin.then(admin => { console.log("administrateur : " + admin);})
  isLogged() {
    return new Promise((resolve, reject) => {
      let user = JSON.parse(localStorage.getItem("user"));
      if (!user) return false;
      resolve(user);
    });
  }
  
  getHomePage() {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user?.role === AuthService.ADMIN) {
      return AuthService.HOME_ADMIN;
    } else {
      return AuthService.HOME_ELEVE;
    }
  }

  isInRoles(roles: String[]) {
    if(!roles) return false;
    const user = JSON.parse(localStorage.getItem("user"));
    return roles.includes(user.role);
    // return roles.includes(AuthService.ADMIN) || roles.includes(AuthService.ELEVE) || roles.includes(AuthService.PROFESSEUR);
  }

  hasRole(route: ActivatedRouteSnapshot) {
    var roles = route?.data?.roles;
    var parent = route.parent;
    while(!roles && parent) {
      if(parent) {
        roles = parent?.routeConfig?.data?.roles;
        parent = roles ? parent : parent.parent;
      }
    }
    const user = JSON.parse(localStorage.getItem("user"));
    return roles.includes(user.role);
  }

  static isEleve() {
    const user = AuthService.getUserFromLS();
    return user && user.role === AuthService.ELEVE;      
  }

  static isProf() {
    const user = AuthService.getUserFromLS();
    return user && user.role === AuthService.PROFESSEUR;      
  }
  
  static isAdmin() {
    const user = AuthService.getUserFromLS();
    return user && user.role === AuthService.ADMIN;      
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  static getUserFromLS():User {
    var user: User = JSON.parse(localStorage.getItem("user"));
    return user;
  }

}

export interface User {
  token: string;
  role: string;
  name: String;
  _id: string;
  user_info: UserInfo;
}
  
export interface UserInfo {
  image: string;
  nom: string;
  prenom: string;
  _id: string; 
} 
