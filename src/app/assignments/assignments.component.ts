import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  
  tabbedListView: Boolean = false;
  draggableListView: Boolean = true;
  simpleListView: Boolean = false;

  static TABBED_LIST = 0;
  static DRAGGABLE_LIST = 1;
  static SIMPLE_LIST = 2;

  // on injecte le service de gestion des assignments
  constructor(private assignmentsService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit() {

  }

  draggableList() {
    this.changeView(AssignmentsComponent.DRAGGABLE_LIST);
  }
  
  tabbedList() {
    this.changeView(AssignmentsComponent.TABBED_LIST);
  }

  simpleList() {
    this.changeView(AssignmentsComponent.SIMPLE_LIST);
  }

  private changeView(view: Number) {
    this.tabbedListView = false;
    this.draggableListView = false;
    this.simpleListView = false;
    switch(view) {
      case AssignmentsComponent.TABBED_LIST:
        this.tabbedListView = true;
        break
      case AssignmentsComponent.DRAGGABLE_LIST:
        this.draggableListView = true;
        break
      case AssignmentsComponent.SIMPLE_LIST:
        this.simpleListView = true;
        break
      default: 
        this.simpleListView = true;
        break
    }
  }

  
}
