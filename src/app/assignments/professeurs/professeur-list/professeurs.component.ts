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

  displayedColumns: string[] = ['image', 'nom', 'prenom', 'matiere'];
  //dataSource = ELEMENT_DATA;

  professeurs:Professeur[];
  page: number=1;
  limit: number=4;
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
      this.limit = +queryParams.limit || 4;

      this.getProfesseurs();
  
    });
      console.log("getProfesseurs() du service appelé");
  }

  pageEvents(event: any) {
    if(event.pageIndex > event.previousPageIndex) {
      this.pageSuivante();
      // Clicked on next button
    } else {
      this.pagePrecedente();
      // Clicked on previous button
    }
    // The code that you want to execute on clicking on next and previous buttons will be written here.
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



}
