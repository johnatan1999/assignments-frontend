import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { BasicAssignmentList } from '../basic-assignment-list';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteModalComponent } from './note-modal/note-modal.component';

@Component({
  selector: 'app-draggable-assignment-list',
  templateUrl: './draggable-assignment-list.component.html',
  styleUrls: ['./draggable-assignment-list.component.css']
})
export class DraggableAssignmentListComponent extends BasicAssignmentList {

  assignmentsRendu: Assignment[];
  assignmentsNonRendu: Assignment[];
  
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];
  constructor(protected assignmentsService:AssignmentsService,
    protected route:ActivatedRoute,
    protected router:Router,public dialog: MatDialog) {
      super(assignmentsService, route, router);
    }

  ngDoCheck() {
    if(this.assignments) {
      this.assignmentsRendu = this.assignments.filter((a) => a.rendu);
      this.assignmentsNonRendu = this.assignments.filter((a) => !a.rendu);
    }
  }

  dropVersRendu(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const assignment: Assignment = event.previousContainer.data[event.previousIndex];
      this.assignments[this.assignments.indexOf(assignment)].rendu = true;
      // console.log(event.previousContainer.data[event.previousIndex]);
      this.openDialog(this.assignments[this.assignments.indexOf(assignment)]);
      transferArrayItem<Assignment>(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  dropVersNonRendu(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const assignment: Assignment = event.previousContainer.data[event.previousIndex];
      const assignmentSelectionne = this.assignments[this.assignments.indexOf(assignment)];
      assignmentSelectionne.rendu = false;
      assignmentSelectionne.note = 0;
      this.assignmentsService.updateAssignment(assignmentSelectionne).subscribe(() => {
        console.log(`Deplacement de '${assignmentSelectionne.nom}' vers la liste des non-rendus`)
      })
      // console.log(event.previousContainer.data[event.previousIndex]);
      // this.openDialog(this.assignments[this.assignments.indexOf(assignment)]);
      transferArrayItem<Assignment>(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  openDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(NoteModalComponent, {
      width: '500px',
      height: '500px',
      data: assignment,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
