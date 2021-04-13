import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { Professeur } from 'src/app/shared/model/professeur.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { BasicAssignmentList } from '../list/basic-assignment-list';

export interface AssignmentsGroup {
  label: String;
  assignments: Assignment[]
}

@Component({
  selector: 'app-assignments-group',
  templateUrl: './assignments-group.component.html',
  styleUrls: ['./assignments-group.component.css'],
  host: { 'class': 'assignments' }
})
export class AssignmentsGroupComponent implements OnInit {
  
  // @Input() professeur: Professeur;

  @Input() assignments: Assignment[] = [];
  @Input() label: string;

  displayedAssignments: Assignment[] = [];
  done = false;

  constructor(protected assignmentsService:AssignmentsService,
    protected route:ActivatedRoute,
    protected router:Router) {
  }

  ngOnInit() {
    this.displayedAssignments = this.assignments.filter((a) => !a.rendu);
  }
  
  onSwitchAssignmentsState(event) {
    event.preventDefault();
    this.displayedAssignments = this.assignments.filter((a) => a.rendu === !this.done);
    this.done = !this.done;
  }

}
