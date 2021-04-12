import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { Professeur } from 'src/app/shared/model/professeur.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AssignmentsGroup } from '../../assignments/assignments-group/assignments-group.component';

@Component({
  selector: 'app-eleve-assignments',
  templateUrl: './eleve-assignments.component.html',
  styleUrls: ['./eleve-assignments.component.css']
})
export class EleveAssignmentsComponent implements OnInit {

  professeursAssignments: AssignmentsGroup[] = [];

  constructor(private assignmentService: AssignmentsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const user = AuthService.getUserFromLS();
    if(user) {
      this.assignmentService.getStudentAssignmentsGroupedByProfessor(user.user_info._id).subscribe((response) => {
        response.data.map((row) => {
          console.log(row.professeur.nom)
          this.professeursAssignments.push({
            assignments: row.assignments,
            label: `${row.professeur.nom} ${row.professeur.prenom}`
          })
        })
      });
    }
  }

}
