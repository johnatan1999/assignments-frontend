import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { BasicAssignmentList } from '../basic-assignment-list';

@Component({
  selector: 'app-simple-assignment-list',
  templateUrl: './simple-assignment-list.component.html',
  styleUrls: ['./simple-assignment-list.component.css']
})
export class SimpleAssignmentListComponent extends BasicAssignmentList {

  // on injecte le service de gestion des assignments
  constructor(protected assignmentsService:AssignmentsService,
              protected route:ActivatedRoute,
              protected router:Router) {
                super(assignmentsService, route, router);
              }
      
}
