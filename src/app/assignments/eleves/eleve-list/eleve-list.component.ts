import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleve } from 'src/app/shared/model/eleve.model';
import { ElevesService } from 'src/app/shared/services/eleves.service';
import { ExportService } from 'src/app/shared/services/export.service';

export interface ExcelJson {
  data: Array<any>;
  header?: Array<string>;
  skipHeader?: boolean;
  origin?: string | number;
}

@Component({
  selector: 'app-eleve-list',
  templateUrl: './eleve-list.component.html',
  styleUrls: ['./eleve-list.component.css']
})
export class EleveListComponent implements OnInit {
  displayedColumns: string[] = ['image', 'nom', 'prenom', 'sexe'];

  @ViewChild('userTable') userTable: ElementRef;
  elevesExport:Eleve[] = [];
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
    private router:Router,
    private titleService: Title,private exportService: ExportService) { 
      this.titleService.setTitle("Liste des etudiants");
    }

  ngOnInit(): void {
    console.log('AVANT AFFICHAGE');
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;

      this.getEleves();
      this.getAllEleves();
      
    });
      console.log("getEleves() du service appelé");
  }


  exportToExcel(): void {
    const edata: Array<ExcelJson> = [];
    // adding more data just to show "how we can keep on adding more data"
    const bd = {
      data: [
        // chart title
        { A: 'Email', B: 'Nom', C: 'Prenom', D: 'Sexe' }, // table header
      ],
      skipHeader: true
    };
    this.elevesExport.forEach(user => {
      bd.data.push({
        A: String(user.mail),
        B: user.nom,
        C: user.prenom,
        D: user.sexe
      });
    });
    edata.push(bd);
    this.exportService.exportJsonToExcel(edata, 'user_data_customized');
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

  getAllEleves() {
   
    this.elevesService.getEleves()
    .subscribe(data => {
      console.log(data);
      data.forEach(d => {
        let eleve = new Eleve();
        eleve.mail = d.identifiant.email;
        eleve.nom = d.nom;
        eleve.prenom = d.prenom;
        eleve.sexe = d.sexe;
        this.elevesExport.push(eleve);
      });
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
