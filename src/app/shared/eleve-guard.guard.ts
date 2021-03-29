import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EleveGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isEleve().then((eleve) => {
        if (eleve) {
          console.log("GUARD : vous êtes eleve, autorisation accordée")
          return true;
        } else {
          // On renvoie vers la page d'accueil
          console.log("GUARD : vous n'êtes pas autorisé à naviguer vers cette url (vous n'êtes pas un eleve))");
          this.router.navigate(['/login']);
          return false;
        }
      });
  }
  
}
