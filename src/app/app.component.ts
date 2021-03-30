import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/services/assignments.service';
import { AuthService } from './shared/services/auth.service';
import { ElevesService } from './shared/services/eleves.service';
import { ProfesseurService } from './shared/services/professeur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Application de gestion des assignments';

  constructor(private authService:AuthService, private router:Router,
              private assignmentsService:AssignmentsService,
              private professeurService: ProfesseurService,
              private eleveService: ElevesService) {}

  
  
  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.eleveService.getEleves()
    .subscribe((eleves) => {
      this.professeurService.getProfesseur()
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
