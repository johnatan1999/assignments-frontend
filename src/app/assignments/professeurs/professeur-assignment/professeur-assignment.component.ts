import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ThrowStmt } from '@angular/compiler';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { Assignment, EtatAssignment } from 'src/app/shared/model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { BasicAssignmentList } from '../../assignments/list/basic-assignment-list';
import { NoteModalComponent } from '../../assignments/list/draggable-assignment-list/note-modal/note-modal.component';

@Component({
  selector: 'app-professeur-assignment',
  templateUrl: './professeur-assignment.component.html',
  styleUrls: ['./professeur-assignment.component.css']
})
export class ProfesseurAssignmentComponent extends BasicAssignmentList {

  // Rendu
  @ViewChild('scrollerRendu') scrollerRendu: CdkVirtualScrollViewport;
  showRenduLoader = false;
  totalDocsRendu: number;
  assignmentsRendu: Assignment[] = [];
  pageRendu = 1;
  renduNextPage: number;
  renduHasNextPage: Boolean;
  searchRendu = '';
  
  // Non Rendu
  @ViewChild('scrollerNonRendu') scrollerNonRendu: CdkVirtualScrollViewport;
  showNotedLoader = false;
  // totalDocsNonRendu: number;
  // assignmentsNonRendu: Assignment[] = [];
  // pageNonRendu = 1;
  // nonRenduNextPage: number;
  // nonRenduHasNextPage: Boolean;
  // searchNonRendu = '';

  constructor(protected assignmentsService:AssignmentsService,
    protected route:ActivatedRoute,
    protected router:Router,public dialog: MatDialog,
    private ngZone: NgZone) {
      super(assignmentsService, route, router);
    }
    
  ngDoCheck() {
    // const rendu = this.assignments.find((a) => a.rendu);
    // const nonRendu = this.assignmentsRendu.find((a) => !a.rendu);
    // this.assignments = this.assignments.filter((a) => !a.rendu);
    // this.assignmentsRendu = this.assignmentsRendu.filter((a) => a.rendu);
    // console.log(this.assignmentsNonRendu.length, this.assignmentsRendu.length, rendu, nonRendu)

    // if(nonRendu)this.assignments.splice(0, 0, nonRendu);
    // if(rendu)this.assignmentsRendu.splice(0, 0, rendu);
    console.log(this.assignments)
    // console.log(this.assignmentsNonRendu.length, this.assignmentsRendu.length)
  }
  
  ngOnInit() {
    // this.showRenduLoader = true;
    // this.showNonRenduLoader = true;
    this.getAssignmentsRendu();
    this.getAssignmentsNotee();
  }
  
  ngAfterViewInit() {
    this.scrollerRendu?.elementScrolled().pipe(
      map(() => this.scrollerRendu.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        if(this.renduHasNextPage) {
          this.pageRendu = this.renduNextPage;
          this.getAssignmentsRendu();
        }
      });
    });
    this.scrollerNonRendu?.elementScrolled().pipe(
      map(() => this.scrollerNonRendu.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        if(this.hasNextPage) {
          this.page = this.nextPage;
          this.getAssignmentsNotee();
        }
      });
    });
  }

  onSearchAssignmentRendu() {
    this.pageRendu = 1;
    this.getAssignmentsRendu();
  }
  
  getAssignmentsNotee() {
    this.findAssignmentsByState(EtatAssignment.NOTEE, true, () => {
    });
  }

  getAssignmentsRendu() {
    this.assignmentsService.getAssignmentsPagine(this.pageRendu, this.limit, 'rendu', this.searchRendu)
    .subscribe((data) => {
      this.pageRendu = data.page;
      this.renduHasNextPage = data.hasNextPage;
      this.renduNextPage = data.nextPage;
      this.assignmentsRendu = this.assignmentsRendu.concat(data.docs);
      this.showRenduLoader = false;
      this.totalDocsRendu = data.totalDocs;
    })
  }
  
  dropVersRendu(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const assignment: Assignment = event.previousContainer.data[event.previousIndex];
      this.assignments[this.assignments.indexOf(assignment)].rendu = true;
      this.openDialog(assignment);
      // transferArrayItem<Assignment>(event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex);
      //                   console.log(this.assignmentsNonRendu)
    }
  }

  dropVersNonRendu(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const assignment: Assignment = event.previousContainer.data[event.previousIndex];
      const assignmentSelectionne = this.assignmentsRendu[this.assignmentsRendu.indexOf(assignment)];
      assignmentSelectionne.rendu = false;
      assignmentSelectionne.note = 0;
      // this.assignmentsRendu = this.assignmentsRendu.filter((a) => a.rendu);
      // this.assignmentsNonRendu.push(assignmentSelectionne);
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
