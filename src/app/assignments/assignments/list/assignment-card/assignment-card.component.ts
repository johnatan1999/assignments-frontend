import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from 'src/app/shared/model/assignment.model';

@Component({
  selector: 'app-assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.css'],
  host: { 'class': 'assignment-card' }
})
export class AssignmentCardComponent implements OnInit {

  @Input() assignment: Assignment;
  @Input() class: String;

  constructor() { }

  ngOnInit(): void {
  }

}
