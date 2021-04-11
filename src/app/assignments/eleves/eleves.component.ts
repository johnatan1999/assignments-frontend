import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleve } from 'src/app/shared/model/eleve.model';
import { ElevesService } from 'src/app/shared/services/eleves.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/*const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];*/
@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.css']
})
export class ElevesComponent implements OnInit {
  displayedColumns: string[] = ['image', 'nom', 'prenom', 'sexe'];
  //dataSource = ELEMENT_DATA;

  eleves:Eleve[];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  pageSizeOptions: number[] = [];


  constructor(private route:ActivatedRoute,private elevesService : ElevesService,
    private router:Router) { }

  ngOnInit(): void {
    console.log('AVANT AFFICHAGE');
   
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;

      this.getEleves();
      
    });
      console.log("getEleves() du service appelé");
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

  getEleves() {
    this.elevesService.getElevesPagine(this.page, this.limit)
    .subscribe(data => {
      this.eleves = data.docs;
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
    this.router.navigate(['/assignments/eleves'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/assignments/eleves'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  onClickAdd() {
    this.router.navigate(['/assignments/eleves/add']);
  }
}
