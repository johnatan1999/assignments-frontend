import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public static ADMIN = "admin";

  public static ELEVE = "eleve";

  public static PROFESSEUR = "professeur";

  public static HOME_ELEVE = "/assignments";

  public static HOME_ADMIN = "/assignments/dashboard";

  constructor(private http: HttpClient) { }

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
    return this.http.post<any>('http://localhost:8010/api/login', body, { 'headers': headers })
      .pipe(
        retry(3),
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


  isProf() {
    return new Promise((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return false;
      resolve(user.role == "prof");
    });
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
        console.log('->', parent.routeConfig)
        roles = parent?.routeConfig?.data?.roles;
        parent = roles ? parent : parent.parent;
      }
    }
    const user = JSON.parse(localStorage.getItem("user"));
    return roles.includes(user.role);
  }

  isEleve() {
    return new Promise((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return false;
      resolve(user.role == "eleve");
    });
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

}
