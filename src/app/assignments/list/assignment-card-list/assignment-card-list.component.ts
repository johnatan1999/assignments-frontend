import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from 'src/app/model/assignment.model';

@Component({
  selector: 'app-assignment-card-list',
  templateUrl: './assignment-card-list.component.html',
  styleUrls: ['./assignment-card-list.component.css']
})
export class AssignmentCardListComponent implements OnInit {

  @Input() assignments: Assignment[];

  constructor() { }

  ngOnInit(): void {
  }

}
