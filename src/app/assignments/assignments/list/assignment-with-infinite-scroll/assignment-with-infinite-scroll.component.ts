import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { BasicAssignmentList } from '../basic-assignment-list';

@Component({
  selector: 'app-assignment-with-infinite-scroll',
  templateUrl: './assignment-with-infinite-scroll.component.html',
  styleUrls: ['./assignment-with-infinite-scroll.component.css']
})
export class AssignmentWithInfiniteScrollComponent extends BasicAssignmentList {

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  @Input() stateFilter: String;

  constructor(protected assignmentsService: AssignmentsService,
    protected route: ActivatedRoute,
    protected router: Router,
    private ngZone: NgZone) {
      super(assignmentsService, route, router);
      this.limit = 15;
    }
  
  ngOnInit() {
    this._getAssignments();
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
      this.findAssignmentsByState(this.stateFilter, true);
      console.log(this.stateFilter, this.assignments);
    } else {
      this.getAssignments(true);
    }
  }

}
