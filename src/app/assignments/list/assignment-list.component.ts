import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {

  tabbedListView: Boolean = false;
  draggableListView: Boolean = false;
  simpleListView: Boolean = false;

  currentView: String = "Liste simple"

  static TABBED_LIST = 0;
  static DRAGGABLE_LIST = 1;
  static SIMPLE_LIST = 2;


  constructor() { }

  ngOnInit(): void {
    this.draggableList()
  }

  draggableList(viewName = 'Liste avec element deplacable') {
    this.currentView = viewName;
    this.changeView(AssignmentListComponent.DRAGGABLE_LIST);
  }
  
  tabbedList(viewName = 'Liste avec onglet') {
    this.currentView = viewName;
    this.changeView(AssignmentListComponent.TABBED_LIST);
  }
  
  simpleList(viewName = 'Liste simple') {
    this.currentView = viewName;
    this.changeView(AssignmentListComponent.SIMPLE_LIST);
  }

  private changeView(view: Number) {
    this.tabbedListView = false;
    this.draggableListView = false;
    this.simpleListView = false;
    switch(view) {
      case AssignmentListComponent.TABBED_LIST:
        this.tabbedListView = true;
        break
      case AssignmentListComponent.DRAGGABLE_LIST:
        this.draggableListView = true;
        break
      case AssignmentListComponent.SIMPLE_LIST:
        this.simpleListView = true;
        break
      default: 
        this.simpleListView = true;
        break
    }
  }

}
