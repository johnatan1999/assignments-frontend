import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { BasicAssignmentList } from '../basic-assignment-list';

@Component({
  selector: 'app-tabbed-assignment-list',
  templateUrl: './tabbed-assignment-list.component.html',
  styleUrls: ['./tabbed-assignment-list.component.css']
})
export class TabbedAssignmentListComponent extends BasicAssignmentList {

  // @ViewChild('scrollerRendu') scrollerRendu: CdkVirtualScrollViewport;
  // showRenduLoader = false;
  assignmentsRendu: any;
  // assignmentsRendu: Assignment[] = [];
  // pageRendu = 1;
  // renduNextPage: number;
  // renduHasNextPage: Boolean;
  // searchRendu = '';
  renduCharge = ''
  
  // // Non Rendu
  // @ViewChild('scrollerNonRendu') scrollerNonRendu: CdkVirtualScrollViewport;
  // showNonRenduLoader = false;
  assignmentsNonRendu: any;
  nonRenduCharge = ''
  // assignmentsNonRendu: Assignment[] = [];
  // pageNonRendu = 1;
  // nonRenduNextPage: number;
  // nonRenduHasNextPage: Boolean;
  // searchNonRendu = '';
  
  constructor(protected assignmentsService:AssignmentsService,
    protected route:ActivatedRoute,
    protected router:Router) {
      super(assignmentsService, route, router);
    }

  getDocsRendu(docs) {
    this.assignmentsRendu = docs;
    this.renduCharge = `(${docs.number}/${docs.maxCount})`;
  } 
  
  getDocsNonRendu(docs) {
    this.assignmentsNonRendu = docs;
    this.nonRenduCharge = `(${docs.number}/${docs.maxCount})`;
  } 
}
