import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChildGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isLogged().then((admin) => {
        if (this.authService.isInRoles(childRoute.data.roles)) {
          console.log("GUARD : autorisation accordée")
          return true;
        } else {
          // On renvoie vers la page d'accueil
          console.log("GUARD : vous n'êtes pas autorisé à naviguer vers cette url (vous n'êtes pas admin))");
          this.router.navigate(['/login']);
          return false;
        }
      });
  }
  
}
