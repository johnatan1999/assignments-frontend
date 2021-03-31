import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professeur } from 'src/app/shared/model/professeur.model';
import { ProfesseurService } from 'src/app/shared/services/professeur.service';

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.component.html',
  styleUrls: ['./professeurs.component.css']
})
export class ProfesseursComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'nom', 'prenom', 'image', 'matiere'];
  //dataSource = ELEMENT_DATA;

  professeurs:Professeur[];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;


  constructor(private route:ActivatedRoute,private professeursService : ProfesseurService,
    private router:Router) { }

  ngOnInit(): void {
    console.log('AVANT AFFICHAGE');
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 2;

      this.getProfesseurs();
  
    });
      console.log("getProfesseurs() du service appelé");
  }

  getProfesseurs() {
    this.professeursService.getProfesseursPagine(this.page, this.limit)
    .subscribe(data => {
      this.professeurs = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
    });
  }


  premierePage() {
    this.router.navigate(['/assignments/professeurs'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
    this.router.navigate(['/assignments/professeurs'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/assignments/professeurs'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/assignments/professeurs'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }

}