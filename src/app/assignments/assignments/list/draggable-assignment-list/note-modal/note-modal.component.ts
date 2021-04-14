import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Assignment } from 'src/app/shared/model/assignment.model';
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
    @Inject(MAT_DIALOG_DATA) public assignment: Assignment) {

    }

  onSubmit(): void {
    this.assignment.rendu = true;
    this.assignment.note = this.note;
    this.assingnmentService.updateAssignment(this.assignment).subscribe((message) => {
      console.log(message);
    });
    this.dialogRef.close();
  }

  onClose(): void {
    this.assignment.rendu = false;
    this.dialogRef.close();
  }

}
