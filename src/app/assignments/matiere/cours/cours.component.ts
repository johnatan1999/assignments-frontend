import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cours } from 'src/app/shared/model/cours.model';
import { Professeur } from 'src/app/shared/model/professeur.model';
import { CoursService } from 'src/app/shared/services/cours.service';
import { CoursDialogComponent } from '../cours-dialog/cours-dialog.component';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  lienVideo: string;
  cours: string;
  id: string;

  listeCours: Cours[];
  page: number = 1;
  limit: number = 4;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  pageSizeOptions: number[] = [];


  @Input()
  responses: Array<any>;
  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;


  name = "Angular";
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  titre: string;

  constructor(private coursService: CoursService, private _Activatedroute: ActivatedRoute, private router : Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");

    this.getCoursPagineParMatiere();
    // on regarde s'il y a page= et limit = dans l'URL
    /*this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 4;

      this.getCoursPagineParMatiere();
      
    });*/


  }


  /*pageSuivante() {
   this.router.navigate(['/assignments/matieres/cours/'+this.id], {
     queryParams: {
       page:this.nextPage,
       limit:this.limit,
     }
   });
 }
 
 
 pagePrecedente() {
   this.router.navigate(['/assignments/matieres/cours/'+this.id], {
     queryParams: {
       page:this.prevPage,
       limit:this.limit,
     }
   });
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
 }*/

  getCoursPagineParMatiere() {

    this.coursService.getCoursPagineParMatiere(this.id)
      .subscribe(data => {
        console.log(data);
        this.listeCours = data;
        /*this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;*/
        console.log("données reçues");
      });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CoursDialogComponent, {
      width: '500px',
      data: { id: this.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       this.listeCours.push(result);
      this.router.navigate(["/assignments/matieres/cours/"+this.id]);
    });
  }


  playPause(video, i) {
    let id = video + i;
    var myVideo: any = document.getElementById(id);
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }


  skip(value, videos, i) {
    let id = videos + i;
    let video: any = document.getElementById(id);
    video.currentTime += value;
  }

  restart(videos, i) {
    let id = videos + i;
    let video: any = document.getElementById(id);
    video.currentTime = 0;
  }

}
