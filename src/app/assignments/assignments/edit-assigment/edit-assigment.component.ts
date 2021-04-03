import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveItem } from 'src/app/shared/model/list-item.model';
import { Matiere } from 'src/app/shared/model/matiere.model';
import { Professeur } from 'src/app/shared/model/professeur.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { ElevesService } from 'src/app/shared/services/eleves.service';
import { MatiereService } from 'src/app/shared/services/matiere.service';
import { ProfesseurService } from 'src/app/shared/services/professeur.service';
import { Assignment } from '../../../shared/model/assignment.model';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment:Assignment;

  // pour le formulaire
  nom = '';
  description = '';
  isLinear = false;
  dateDeRendu = null;
  assignmentFormGroup: FormGroup;
  remarque = '';
  note = 0; 
  
  eleveRecherche = '';
  profSelectionne = null;
  listeEleves: EleveItem[] = [];
  listeElevesAffiche: EleveItem[] = [];
  eleveSelectionne: any;
  professeurs: Professeur[];

  constructor(
    private assignmentsService: AssignmentsService,
    private professeurService: ProfesseurService,
    private elevesService: ElevesService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}
  
  get formArray(): AbstractControl | null { return this.assignmentFormGroup.get('formArray'); }
  
  ngOnInit(): void {
    this.assignmentFormGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          nomDevoirCtrl: ['', Validators.required],
          descriptionDevoirCtrl: ['', Validators.required],
          remarqueCtrl: ['', ''],
          dateCtrl: ['', Validators.required],
          matiereCtrl: ['', Validators.required]
        }),
        this._formBuilder.group({
          searchCtrl: ['', ()=>{}]
        }),
      ])
    });

    this.professeurService.getProfesseurs().subscribe((professeurs: any) => {
      this.professeurs = professeurs.docs;
    })
    this.elevesService.getEleves()
    .subscribe((eleves: any) => {
      eleves = eleves.docs;
      this.listeEleves = eleves.map((e) => {
        return new EleveItem(e, false);
      });
      this.listeElevesAffiche = this.listeEleves;
    });
    this.getAssignmentById();
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
      this.eleveSelectionne = assignment.eleve;
      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.description = assignment.description;
      this.note = assignment.note;
      this.remarque = assignment.remarque;
      this.profSelectionne = this.professeurs?.find((p) => p.id === this.assignment.professeur.id);
    });
  }


  onSubmit(event) {
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu)) return;

    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.eleve = this.eleveSelectionne;
    this.assignment.professeur = this.profSelectionne;
    this.assignment.description = this.description;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["assignments/detail/" + this.assignment.id]);
      })

  }

  selectEleve(item: EleveItem) {
    this.eleveSelectionne = item.eleve;
    const index_ = this.listeEleves.indexOf(item);
    this.listeEleves[index_].checked = true;
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
