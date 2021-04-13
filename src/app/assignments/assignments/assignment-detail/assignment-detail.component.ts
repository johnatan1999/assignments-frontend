import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Assignment } from '../../../shared/model/assignment.model';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  @Input() assignment: Assignment;

  @Input() withAction: Boolean = true;

  @Input() flatCard: Boolean = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private _location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if(!this.assignment) {
      this.getAssignmentById();
    }
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
    });
  }

  onAssignmentRendu() {
    this.assignment.rendu = true;

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });

    //this.assignment = null;
  }

  update(assignment) {
    this.assignment = assignment;
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignment.id, 'edit'], {
      queryParams: {
        nom:'Michel Buffa',
        metier:"Professeur",
        responsable:"MIAGE"
      },
      fragment:"edition"
    });
  }

  onClickBackButton() {
    this._location.back();
  }

  private onDelete() {
    this.assignmentsService
      .deleteAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // on cache l'affichage du détail
        this.assignment = null;

        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/assignments']);
      });
  }

  openConfirmDialog() {
    const dialogPosition: DialogPosition = {
      top: '50px'
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      position: dialogPosition,
      data: { 
        yesButton: 'Confirmer', 
        noButton: 'Annuler', 
        message: 'Veuillez confirmer la suppression.',
        onConfirm: () => {
          this.onDelete();
        }
      }
    })
  }

}
