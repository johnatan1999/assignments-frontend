import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Assignment } from 'src/app/shared/model/assignment.model';
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

  constructor(
    public dialogRef: MatDialogRef<DraggableAssignmentListComponent>,
    @Inject(MAT_DIALOG_DATA) public assignment: Assignment) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
