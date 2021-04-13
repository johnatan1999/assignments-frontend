import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AssignmentsService } from './shared/services/assignments.service';
import { AuthService } from './shared/services/auth.service';
import { ElevesService } from './shared/services/eleves.service';
import { ProfesseurService } from './shared/services/professeur.service';
import { UrlService } from './shared/services/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Application de gestion des assignments';
  previousUrl: string = null;
  currentUrl: string = null;
  constructor(private router:Router,
              private assignmentsService:AssignmentsService,
              private professeurService: ProfesseurService,
              private eleveService: ElevesService) {
                this.router.events.pipe(
                  filter((event) => event instanceof NavigationEnd)
                ).subscribe((event: NavigationEnd) => {
                  this.previousUrl = this.currentUrl;
                  UrlService.setPreviousUrl(this.previousUrl);
                  this.currentUrl = event.url;
                }); 
              }

  
  
  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.eleveService.getEleves()
    .subscribe((eleves) => {
      this.professeurService.getProfesseurs()
      .subscribe((matieres) => {
        this.assignmentsService.peuplerBDAvecForkJoin(eleves, matieres)
          .subscribe(() => {
            console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
            this.router.navigate(["/home"], {replaceUrl:true});
          })
      });
    });
  }

  

  importerEleve() {
    this.eleveService.importEleve() 
    .subscribe(() => {
      console.log("Ajout eleve");
      this.router.navigate(["/home"], {replaceUrl:true});
    })
  }
}
