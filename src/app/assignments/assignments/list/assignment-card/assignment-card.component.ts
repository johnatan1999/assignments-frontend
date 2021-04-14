import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DynamicDialogComponent } from 'src/app/components/dynamic-dialog/dynamic-dialog.component';
import { Assignment, EtatAssignment } from 'src/app/shared/model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.css'],
  host: { 'class': 'assignment-card' }
})
export class AssignmentCardComponent implements OnInit {

  @Input() assignment: Assignment;
  @Input() class: String;
  @Input() hideEleve = false;
  @Input() hideState = true;
  @Input() hideEditButton = false;
  inProgress: Boolean;
  constructor(private dialog: MatDialog,
    private assignmentService: AssignmentsService, 
    private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.inProgress = this.assignment.etat === EtatAssignment.EN_COURS;
  }

  ngAfterViewInit() {
    this.hideEleve = AuthService.isEleve()
  }

  onEdit(event) {
    event.stopPropagation();
  }

  onStart(event) {
    this.assignment.etat = EtatAssignment.EN_COURS;
    this.assignmentService.updateAssignment(this.assignment).subscribe((response) => {
      this._snackBar.open("Assignment", "Modifiée", {
        duration: 3000,
        panelClass: ['snack-bar']
      })
    });
  }
  
  onStop(event) {
    // this.assignment.enCours = false;
    // this.assignmentService.updateAssignment(this.assignment).subscribe((response) => {
    // });
    this._snackBar.open("Assignment", "Modifiée", {
      duration: 3000,
      panelClass: ['snack-bar']
    })
  }

  onValidAssignment(event) {
    this.assignment.etat = 0;
    this.assignment.rendu = true;
    this.assignmentService.updateAssignment(this.assignment).subscribe((response) => {
      this._snackBar.open("Assignment", "Modifiée", {
        duration: 2000
      })
    });
  }  

  onOpenDetail(event) {
    // console.log(event);
    event.stopPropagation();
    this.dialog.open(DynamicDialogComponent, {
      width: '700px',
      data: {
        assignment: this.assignment
      }
    })
  }

}
