import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ThrowStmt } from '@angular/compiler';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private ngZone: NgZone, private _snackBar: MatSnackBar) {
      super(assignmentsService, route, router);
    }
    
  ngDoCheck() {
    const rendu = this.assignments.find((a) => a.rendu && a.etat !== EtatAssignment.NOTEE);
    const notee = this.assignmentsRendu.find((a) => a.etat === EtatAssignment.NOTEE);
    this.assignments = this.assignments.filter((a) => a.etat === EtatAssignment.NOTEE);
    this.assignmentsRendu = this.assignmentsRendu.filter((a) => a.etat !== EtatAssignment.NOTEE);
    if(notee) this.assignments.splice(0, 0, notee);
    if(rendu) this.assignmentsRendu.splice(0, 0, rendu);
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
          this.getAssignmentsNotee();
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
            this.getAssignmentsRendu();
        }
      });
    });
  }

  onSearchAssignmentRendu() {
    this.pageRendu = 1;
    this.getAssignmentsRendu(false);
  }

  onSearchAssignmentNotee() {
    this.pageRendu = 1;
    this.assignmentsService.getAssignmentsPagine(this.pageRendu, this.limit, 'rendu', this.search)
    .subscribe((data) => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
    })
  }
  
  getAssignmentsNotee() {
    this.findAssignmentsByState(EtatAssignment.NOTEE, true, () => {});
  }

  getAssignmentsRendu(appendData=true) {
    this.assignmentsService.getAssignmentsPagine(this.pageRendu, this.limit, 'rendu', this.searchRendu)
    .subscribe((data) => {
      this.pageRendu = data.page;
      this.renduHasNextPage = data.hasNextPage;
      this.renduNextPage = data.nextPage;
      this.assignmentsRendu = appendData ? this.assignmentsRendu.concat(data.docs) : data.docs;
      this.showRenduLoader = false;
      this.totalDocsRendu = data.totalDocs;
    })
  }
  
  dropVersNote(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const assignment: Assignment = event.previousContainer.data[event.previousIndex];
      this.assignmentsRendu[this.assignmentsRendu.indexOf(assignment)].rendu = true;
      this.assignmentsRendu[this.assignmentsRendu.indexOf(assignment)].etat = EtatAssignment.NOTEE;
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
      const assignmentSelectionne = this.assignments[this.assignments.indexOf(assignment)];
      assignmentSelectionne.rendu = false;
      assignmentSelectionne.note = 0;
      assignmentSelectionne.etat = 0;
      // this.assignmentsRendu = this.assignmentsRendu.filter((a) => a.rendu);
      // this.assignmentsNonRendu.push(assignmentSelectionne);
      this.assignmentsService.updateAssignment(assignmentSelectionne).subscribe(() => {
        this._snackBar.open("Assignment", "Modifiée", {
          duration: 4000
        })
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
