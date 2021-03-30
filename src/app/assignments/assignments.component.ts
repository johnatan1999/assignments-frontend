import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { assignmentsGeneres } from 'src/dummy-data/assignments.data';
import { Assignment } from '../shared/model/assignment.model';
import { AssignmentsService } from '../shared/services/assignments.service';
import { ElevesService } from '../shared/services/eleves.service';
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
  
  // on injecte le service de gestion des assignments
  constructor(private router:Router, private assignmentService: AssignmentsService,
    private eleveService: ElevesService, private professeurService: ProfesseurService,
    private assignmentsService:AssignmentsService) {}
  
  ngOnInit() {
    
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

  peuplerBD() {
    this.eleveService.getEleves()
    .subscribe((eleves) => {
      this.professeurService.getProfesseur()
      .subscribe((matieres) => {
        this.assignmentService.peuplerBDAvecForkJoin(eleves, matieres)
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
    .subscribe((eleves) => {
      this.professeurService.getProfesseur()
      .subscribe((matieres) => {
        assignmentsGeneres.forEach((a) => {
          const nouvelAssignment = new Assignment();
          const randEleve = Math.floor(Math.random() * eleves.length);
          const randMatiere = Math.floor(Math.random() * matieres.length);
          nouvelAssignment.id = a.id;
          nouvelAssignment.nom = `${a.nom.charAt(0).toLocaleUpperCase()}${a.nom.substr(1)}`;
          nouvelAssignment.description = a.description;
          nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
          nouvelAssignment.rendu = a.rendu;
          nouvelAssignment.matiere = matieres[randMatiere];
          nouvelAssignment.eleve = eleves[randEleve];
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
      });
    });
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

}
