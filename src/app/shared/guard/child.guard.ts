import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChildGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isLogged().then((logged) => {
        // if (logged && this.authService.isInRoles(childRoute.parent.routeConfig.data.roles)) {
        if (logged && this.authService.hasRole(childRoute)) {
          console.log("GUARD : autorisation accordée", childRoute.routeConfig.path)
          return true;
        } else {
          // On renvoie vers la page d'accueil
          console.log("GUARD : vous n'êtes pas autorisé à naviguer vers cette url (vous n'êtes pas admin))");
          this.router.navigate(['/403'], { state: { message: "Vous n'êtes pas autorisé à accéder a cette page!" } });
          return false;
        }
      });
  }
  
}
