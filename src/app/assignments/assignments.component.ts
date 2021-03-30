import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/services/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  
  // on injecte le service de gestion des assignments
  constructor( private router:Router) {}
  
  ngOnInit() {
    
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

  peuplerBD() {
    
  }

  genererProfesseurs() {

  }

  genererEleves() {

  }

}
