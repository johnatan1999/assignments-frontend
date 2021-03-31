import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { BasicAssignmentList } from '../basic-assignment-list';

@Component({
  selector: 'app-tabbed-assignment-list',
  templateUrl: './tabbed-assignment-list.component.html',
  styleUrls: ['./tabbed-assignment-list.component.css']
})
export class TabbedAssignmentListComponent extends BasicAssignmentList {

  assignmentsRendu: Assignment[];
  assignmentsNonRendu: Assignment[];

  constructor(protected assignmentsService:AssignmentsService,
    protected route:ActivatedRoute,
    protected router:Router) {
      super(assignmentsService, route, router);
    }

  ngDoCheck() {
    if(this.assignments) {
      this.assignmentsRendu = this.assignments.filter((a) => a.rendu);
      this.assignmentsNonRendu = this.assignments.filter((a) => !a.rendu);
    }
  }

}