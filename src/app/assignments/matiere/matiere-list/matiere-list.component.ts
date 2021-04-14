import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from 'src/app/shared/model/matiere.model';
import { MatiereService } from 'src/app/shared/services/matiere.service';

@Component({
  selector: 'app-matiere-list',
  templateUrl: './matiere-list.component.html',
  styleUrls: ['./matiere-list.component.css']
})
export class MatiereListComponent implements OnInit {

  displayedColumns: string[] = ['image', 'matiere','details'];

  matieres:Matiere[];
  page: number=1;
  limit: number=4;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;


  constructor(private route:ActivatedRoute,private matiereService : MatiereService,
    private router:Router) { }

  ngOnInit(): void {
    console.log('AVANT AFFICHAGE');
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 4;

      this.getMatieres();
  
    });
      console.log("getMatiere() du service appelé");
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

  getMatieres() {
    this.matiereService.getMatierePagine(this.page, this.limit)
    .subscribe(data => {
      this.matieres = data.docs;
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
    this.router.navigate(['/assignments/matieres'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/assignments/matieres'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }


}
