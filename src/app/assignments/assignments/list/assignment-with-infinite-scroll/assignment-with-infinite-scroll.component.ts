import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { DynamicDialogComponent } from 'src/app/components/dynamic-dialog/dynamic-dialog.component';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AssignmentDetailComponent } from '../../assignment-detail/assignment-detail.component';
import { BasicAssignmentList } from '../basic-assignment-list';

@Component({
  selector: 'app-assignment-with-infinite-scroll',
  templateUrl: './assignment-with-infinite-scroll.component.html',
  styleUrls: ['./assignment-with-infinite-scroll.component.css']
})
export class AssignmentWithInfiniteScrollComponent extends BasicAssignmentList {

  @ViewChild('scroller') protected scroller: CdkVirtualScrollViewport;

  @Input() protected stateFilter: String;
  @Output() protected assignmentsDocs: EventEmitter<any>;

  hideEditCard = false

  constructor(protected assignmentsService: AssignmentsService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected ngZone: NgZone, 
    protected dialog: MatDialog) {
      super(assignmentsService, route, router);
      this.limit = 15;
      this.assignmentsDocs = new EventEmitter();
    }
    
  ngOnInit() {
    this._getAssignments();
    this.hideEditCard = AuthService.isAdmin();
  }

  ngAfterViewInit() {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
      ).subscribe(() => {
        this.ngZone.run(() => {
          if(this.hasNextPage) {
            this.page = this.nextPage;
            this._getAssignments();
          }
        });
      });
    }
    
    _getAssignments() {
      if(this.stateFilter && (this.stateFilter === BasicAssignmentList.RENDU || BasicAssignmentList.NON_RENDU)) {
        this.findAssignmentsByState(this.stateFilter, true, () => {
          this.assignmentsDocs.emit({
            maxCount: this.totalDocs,
            number: this.assignments.length
          });
        });
      } else {
        this.getAssignments(true);
      }
  }

  onOpenDetail(assignment) {
    this.dialog.open(DynamicDialogComponent, {
      width: '600px',
      data: {
        component: AssignmentDetailComponent,
        assignment: assignment
      }
    })
  }

}
