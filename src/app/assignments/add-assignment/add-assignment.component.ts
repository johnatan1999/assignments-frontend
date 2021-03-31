import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Eleve } from 'src/app/shared/model/eleve.model';
import { EleveItem } from 'src/app/shared/model/list-item.model';
import { Matiere } from 'src/app/shared/model/matiere.model';
import { Professeur } from 'src/app/shared/model/professeur.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { ElevesService } from 'src/app/shared/services/eleves.service';
import { ProfesseurService } from 'src/app/shared/services/professeur.service';
import { Assignment } from '../../shared/model/assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})

export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = '';
  description = '';
  isLinear = false;
  dateDeRendu = null;
  assignmentFormGroup: FormGroup;
  
  toppings = new FormControl();
  
  eleveRecherche = '';
  matiereSelectionne = null;
  listeEleves: EleveItem[] = [];
  listeElevesAffiche: EleveItem[] = [];
  elevesSelectionnes = [];
  matieres: Matiere[];

  get formArray(): AbstractControl | null { return this.assignmentFormGroup.get('formArray'); }

  constructor(private assignmentsService:AssignmentsService,
              private elevesService: ElevesService,
              private professeurService: ProfesseurService,
              private router:Router,
              private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.assignmentFormGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          nomDevoirCtrl: ['', Validators.required],
          descriptionDevoirCtrl: ['', Validators.required],
          dateCtrl: ['', Validators.required],
          matiereCtrl: ['', Validators.required]
        }),
        this._formBuilder.group({
          searchCtrl: ['', ()=>{}]
        }),
      ])
    });
    this.elevesService.getEleves()
      .subscribe((eleves: any) => {
        eleves = eleves.docs;
        this.listeEleves = eleves.map((e) => {
          return new EleveItem(e, false);
        });
        this.listeElevesAffiche = this.listeEleves;
      });

    this.professeurService.getProfesseur()
    .subscribe((professeurs: any) => {
      professeurs = professeurs.docs;
      
      this.matieres = professeurs.map(professeur => professeur.matiere);
    })
  }

  onSubmit(event) {
    if((!this.nom) || (!this.dateDeRendu)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/home"]);
      });
  }

  onSubmit_(event) {
    if((!this.nom) || (!this.dateDeRendu)) return;
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.description = this.description;
    nouvelAssignment.remarque = '';
    nouvelAssignment.matiere = this.matiereSelectionne;
    nouvelAssignment.note = 0;

    this.assignmentsService.addAssignments(nouvelAssignment, this.getElevesSelectiones().map(e => e.eleve))
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/home"]);
      });
  }

  checkEleve(eleve: EleveItem) {
    const index = this.listeEleves.indexOf(eleve);
    this.listeEleves[index].checked = !eleve.checked;
    this.getElevesSelectiones();
  }

  getElevesSelectiones() {
    return this.listeEleves.filter((e) => e.checked);
  }

  onSearch() {
    if(!this.eleveRecherche) {
      this.listeElevesAffiche = this.listeEleves;
      return;
    }
    this.listeElevesAffiche = [];
    this.listeEleves.forEach((e) => { 
      const critere = this.eleveRecherche.toLocaleLowerCase();
      if(e.eleve.nom?.toLocaleLowerCase().includes(critere) ||
      e.eleve.prenom?.toLocaleLowerCase().includes(critere)) {
        this.listeElevesAffiche.push(e);
      }
    });
  }

}
