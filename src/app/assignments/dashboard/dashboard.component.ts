import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard.service";

export class NumberOnDashboard {
  eleve: number;
  professeur: number;
  matiere: number;
  assignment: number;
  assignmentRendu: number;
  assignmentPasRendu: number;
  assignmentEnCours: number;
}
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  professorSuccessRate:any = {};
  dataSource: any;
  dateValue: Date;
  number: NumberOnDashboard = new NumberOnDashboard();
  constructor(private dashboard: DashboardService) { }

  ngOnInit(): void {
    this.loadNumberOnDashboard();
    this.getSuccessRateByMatter();
    this.refreshProfessorSuccessRate();
  }

  getSuccessRateByMatter() {
    this.dashboard.getSuccessRateByMatter().subscribe((data: any[]) => {
      let labels = [];
      let note = [];
      data.forEach((d) => {
        if (d._id.nom.length > 10) {
          d._id.nom = d._id.nom.substring(0, 10);
        }
        labels.push(d._id.nom);
        note.push((d.avgNote * 100) / 20);
      });

      this.dataSource = {
        labels: labels,
        datasets: [{
          label: "Matière",
          backgroundColor: "#f78f8f",
          data: note,
        }]
      };
    });
  }

  loadNumberOnDashboard() {
    this.dashboard.getDashboard().subscribe((dashboard: any) => {
      this.dashboard
        .getAssignmentDashboard()
        .subscribe((dashboardAssignment: any) => {
          this.number.eleve = dashboard.eleve;
          this.number.professeur = dashboard.professeur;
          this.number.matiere = dashboard.matiere;
          this.number.assignment = dashboardAssignment.assignment;
          this.number.assignmentPasRendu =
            dashboardAssignment.assignmentPasRendu;
          this.number.assignmentRendu = dashboardAssignment.assignmentRendu;
          this.number.assignmentEnCours = dashboardAssignment.assignmentEnCours;
        });
    });
  }
  
  refreshProfessorSuccessRate() {
    this.dashboard.getProfessorSuccessRate().subscribe((data: any[]) => {
      const data_ = {
        labels: data.map((prof) => prof._id.nom),
        datasets: [
          {
            label: 'Professeur',
            data: data.map((prof) => ((prof.successRate * 100) / 20).toFixed(2)),
            fill: true,
            borderColor: '#FFC107'
          }
        ]
      }
      this.professorSuccessRate = data_;
    });
  }
}
