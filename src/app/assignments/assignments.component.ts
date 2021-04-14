import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { assignmentsGeneres } from 'src/dummy-data/assignments.data';
import { Assignment, EtatAssignment } from '../shared/model/assignment.model';
import { AssignmentsService } from '../shared/services/assignments.service';
import { AuthService } from '../shared/services/auth.service';
import { ElevesService } from '../shared/services/eleves.service';
import { MatiereService } from '../shared/services/matiere.service';
import { ProfesseurService } from '../shared/services/professeur.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {

  progression = 0;
  progressionMax = 0;
  tauxProgression = 0;

  showProgression = false;
  openedSidenav: boolean = true;

  backgroundProgression = false;

  isEleve = false;
  isProf = false;

  @ViewChild("sidenav") sidenav: MatSidenav;
  @ViewChild("logo") headerLogo: ElementRef;
  
  
  // on injecte le service de gestion des assignments
  constructor(private router:Router, private assignmentService: AssignmentsService,
    private eleveService: ElevesService, private professeurService: ProfesseurService,
    private matiereService: MatiereService, 
    private assignmentsService:AssignmentsService) {}
  
  ngOnInit() {
    this.isEleve = AuthService.isEleve();
    this.isProf = AuthService.isProf();
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

  peuplerBD() {
    this.eleveService.getEleves()
    .subscribe((eleves: any) => {
      this.professeurService.getProfesseurs()
      .subscribe((matieres) => {
        this.assignmentService.peuplerBDAvecForkJoin(eleves.docs, matieres)
          .subscribe(() => {
            console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
            this.router.navigate(["/home"], {replaceUrl:true});
          })
      });
    });
  }

  peuplerBDAvecProgressBar() {
    this.showProgression = true;
    this.eleveService.getEleves()
    .subscribe((eleves: any) => {
      eleves = eleves.docs;
      this.professeurService.getProfesseurs()
      .subscribe((professeurs: any) => {
        professeurs = professeurs.docs;
        assignmentsGeneres.forEach((a) => {
          const nouvelAssignment = new Assignment();
          const randEleve = Math.floor(Math.random() * eleves.length);
          const randNote = Math.floor(Math.random() * 12) + 8;
          const randMatiere = Math.floor(Math.random() * professeurs.length);
          nouvelAssignment.id = a.id;
          nouvelAssignment.nom = `${a.nom.charAt(0).toLocaleUpperCase()}${a.nom.substr(1)}`;
          nouvelAssignment.description = a.description;
          nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
          nouvelAssignment.rendu = a.rendu;
          nouvelAssignment.professeur = professeurs[randMatiere];
          nouvelAssignment.eleve = eleves[randEleve];
          nouvelAssignment.note = a.rendu && randNote % 3 === 0  ? randNote : 0;
          nouvelAssignment.etat = a.rendu && randNote % 3 === 0  ? EtatAssignment.NOTEE : 0;
          this.progressionMax = assignmentsGeneres.length;
          this.assignmentsService.addAssignment(nouvelAssignment).subscribe(() => {
            this.progression += 1;
            this.tauxProgression = Math.round(this.progression/this.progressionMax*100);
            if(this.progression === this.progressionMax)
              setTimeout(()=> {
                this.progression = 0;
                this.progressionMax = 0;
                this.tauxProgression = 0;
                this.showProgression = false;
              }, 1000)
          })
        });
        this.router.navigate(['/assignments']);
      });
    });
  }

  mettreEnArrierePlan() {
    this.backgroundProgression = true;
  }

  genererProfesseurs() {
    this.professeurService.importProfesseurs().subscribe(() => {
      console.log("Professeurs générés!")
    });
  }

  genererEleves() {
    this.eleveService.importEleve().subscribe(() => {
      console.log("Eleves générés!");
    });
  }

  genererMatieres() {
    this.matiereService.importMatieres().subscribe(() => {
      console.log("Matieres générées!");
    });
  }

}
