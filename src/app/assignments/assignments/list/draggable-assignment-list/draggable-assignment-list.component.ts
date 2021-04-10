import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { BasicAssignmentList } from '../basic-assignment-list';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteModalComponent } from './note-modal/note-modal.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-draggable-assignment-list',
  templateUrl: './draggable-assignment-list.component.html',
  styleUrls: ['./draggable-assignment-list.component.css']
})
export class DraggableAssignmentListComponent extends BasicAssignmentList {
    
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
  showNonRenduLoader = false;
  totalDocsNonRendu: number;
  assignmentsNonRendu: Assignment[] = [];
  pageNonRendu = 1;
  nonRenduNextPage: number;
  nonRenduHasNextPage: Boolean;
  searchNonRendu = '';

  constructor(protected assignmentsService:AssignmentsService,
    protected route:ActivatedRoute,
    protected router:Router,public dialog: MatDialog,
    private ngZone: NgZone) {
      super(assignmentsService, route, router);
    }
    
  ngDoCheck() {
    const rendu = this.assignmentsNonRendu.find((a) => a.rendu);
    const nonRendu = this.assignmentsRendu.find((a) => !a.rendu);
    this.assignmentsNonRendu = this.assignmentsNonRendu.filter((a) => !a.rendu);
    this.assignmentsRendu = this.assignmentsRendu.filter((a) => a.rendu);
    // console.log(this.assignmentsNonRendu.length, this.assignmentsRendu.length, rendu, nonRendu)

    if(nonRendu)this.assignmentsNonRendu.splice(0, 0, nonRendu);
    if(rendu)this.assignmentsRendu.splice(0, 0, rendu);
    // console.log(this.assignmentsNonRendu.length, this.assignmentsRendu.length)
  }
  
  ngOnInit() {
    // this.showRenduLoader = true;
    // this.showNonRenduLoader = true;
    this.getAssignmentsByState(true);
    this.getAssignmentsByState(false);
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
          this.getAssignmentsByState(true);
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
        if(this.nonRenduHasNextPage) {
          this.pageNonRendu = this.nonRenduNextPage;
          this.getAssignmentsByState(false, this.search);
        }
      });
    });
  }

  onSearchAssignmentRendu() {
    this.pageRendu = 1;
    this.getAssignmentsByState(true, this.searchRendu, false)
  }

  onSearchAssignmentNonRendu() {
    this.pageNonRendu = 1;
    this.getAssignmentsByState(false, this.searchNonRendu, false)
  }

  getAssignmentsByState(rendu, criteria='', appendData=true) {
    this.assignmentsService.getAssignmentsPagine(rendu ? this.pageRendu : this.pageNonRendu, this.limit, rendu ? 'rendu' : 'nonrendu', criteria)
    .subscribe(data => {
      var assignments = rendu ? this.assignmentsRendu : this.assignmentsNonRendu;
      assignments = appendData ? assignments.concat(data.docs): data.docs;
      if(rendu) {
        this.pageRendu = data.page;
        this.renduHasNextPage = data.hasNextPage;
        this.renduNextPage = data.nextPage;
        this.assignmentsRendu = assignments;
        this.showRenduLoader = false;
        this.totalDocsRendu = data.totalDocs;
      }
      else {
        this.nonRenduHasNextPage = data.hasNextPage;
        this.nonRenduNextPage = data.nextPage;
        this.pageNonRendu = data.page;
        this.showNonRenduLoader = false;
        this.assignmentsNonRendu = assignments;
        this.totalDocsNonRendu = data.totalDocs;
      }
    });
  }
  
  dropVersRendu(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const assignment: Assignment = event.previousContainer.data[event.previousIndex];
      this.assignmentsNonRendu[this.assignmentsNonRendu.indexOf(assignment)].rendu = true;
      // console.log(event.previousContainer.data[event.previousIndex]);
      // this.assignmentsNonRendu = this.assignmentsNonRendu.filter((a) => !a.rendu)
      // this.assignmentsRendu.push(assignment);
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
