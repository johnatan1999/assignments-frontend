import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Assignment, EtatAssignment } from 'src/app/shared/model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { DraggableAssignmentListComponent } from '../draggable-assignment-list.component';


// export interface DialogData {
//   Assingment: string;
//   name: string;
// }

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})
export class NoteModalComponent {

  note = 0;

  constructor(
    private assingnmentService: AssignmentsService,
    public dialogRef: MatDialogRef<DraggableAssignmentListComponent>,
    @Inject(MAT_DIALOG_DATA) public assignment: Assignment, private _snackBar: MatSnackBar) {

    }

  onSubmit(): void {
    this.assignment.rendu = true;
    this.assignment.note = this.note;
    this.assignment.etat = EtatAssignment.NOTEE;
    this.assingnmentService.updateAssignment(this.assignment).subscribe((message) => {
      this._snackBar.open("Assignment", "Notée", {
        duration: 4000
      })
      console.log(message);
    });
    this.dialogRef.close();
  }

  onClose(): void {
    this.assignment.rendu = false;
    this.dialogRef.close();
  }

}
