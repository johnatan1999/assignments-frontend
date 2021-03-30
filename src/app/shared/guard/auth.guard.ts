import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //return true;
    // on n'autorisera l'activation de la route associée que si on est
    // bien un admin
    return this.authService.isLogged().then((logged) => {
      if (logged && this.authService.isInRoles(route.data.roles)) {
        console.log("GUARD : autorisation accordée", route.routeConfig.path)
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
