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

  lienVideo : string ;
  cours : string ;
  id : string;

  listeCours:Cours[];
  page: number=1;
  limit: number=4;
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
  private title: string; 


  name = "Angular";
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  titre: string;

  constructor(private route:ActivatedRoute,private zone: NgZone,private coursService : CoursService, private _Activatedroute:ActivatedRoute, private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    console.log(this.id);

    this.getCoursPagineParMatiere();
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 4;

      this.getCoursPagineParMatiere();
      
    });
           // Create the file uploader, wire it to upload to your account
           const uploaderOptions: FileUploaderOptions = {
      
            url: `https://api.cloudinary.com/v1_1/dy528ddbe/upload`,
            // Upload files automatically upon addition to upload queue
            autoUpload: true,
            // Use xhrTransport in favor of iframeTransport
            isHTML5: true,
            // Calculate progress independently for each uploaded file
            removeAfterUpload: true,
            // XHR request headers
            headers: [
              {
                name: 'X-Requested-With',
                value: 'XMLHttpRequest'
              }
            ]
          };
          this.uploader = new FileUploader(uploaderOptions);
      
          this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
            // Add Cloudinary's unsigned upload preset to the upload form
            form.append('upload_preset', 's939zbnr');
            // Add built-in and custom tags for displaying the uploaded photo in the list
            let tags = 'myphotoalbum';
            if (this.title) {
              form.append('context', `photo=${this.title}`);
              tags = `myphotoalbum,${this.title}`;
            }
            // Upload to a custom folder
            // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
            // In order to automatically create the folders based on the API requests,
            // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
            form.append('folder', 'angular_sample');
            // Add custom tags
            form.append('tags', tags);
            // Add file to upload
            form.append('file', fileItem);
      
            // Use default "withCredentials" value for CORS requests
            fileItem.withCredentials = false;
            return { fileItem, form };
          };
      
          // Insert or update an entry in the responses array
          const upsertResponse = fileItem => {
      
            // Run the update in a custom zone since for some reason change detection isn't performed
            // as part of the XHR request to upload the files.
            // Running in a custom zone forces change detection
            this.zone.run(() => {
       // Update an existing entry if it's upload hasn't completed yet
      
              // Find the id of an existing item
              const existingId = this.responses.reduce((prev, current, index) => {
                if (current.file.name === fileItem.file.name && !current.status) {
                  return index;
                }
                return prev;
              }, -1);
              if (existingId > -1) {
                // Update existing item with new data
                this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
              } else {
                // Create new response
                this.responses.push(fileItem);
              }
            });
      
  }

   // Update model on completion of uploading a file
   this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
   upsertResponse(
     {
       file: item.file,
       status,
       data: JSON.parse(response)
     }
   );

 // Update model on upload progress event
 this.uploader.onProgressItem = (fileItem: any, progress: any) =>
   upsertResponse(
     {
       file: fileItem.file,
       progress,
       data: {}
     }
   );
 }
 pageSuivante() {
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
}

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

  //name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(CoursDialogComponent, {
      width: '500px',
      data: { id: this.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.router.navigate(["/assignments/matieres/cours/"+this.id]);
      this.titre = result;
      //this.addCours();
    });
  }

  getUrlFromResponse(){
    this.responses.forEach((response)=>{
      let datas = this.getFileProperties(response.data);
      datas.forEach((data)=>{
        this.lienVideo = data.url;
      })
    })
  }

  
  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ 'key': key, 'value': fileProperties[key] , url:fileProperties['url']}));
  }
  addCours(){
    console.log(this.cours);
    if((!this.lienVideo) || (!this.cours)) return;
    this.getUrlFromResponse();
    /*console.log(this.nom.value);
    console.log(this.prenom.value);
    console.log(this.image.value);
    console.log(this.sexe.value);*/

    let cours = new Cours();
    let professeur = new Professeur();

    cours.titre = this.cours;
    cours.cours = this.lienVideo;
    cours.professeur = professeur;

    console.log(cours.titre);
    console.log(cours.cours);

   /* this.coursService.addCours(cours)
    .subscribe(reponse => {
      console.log(reponse.message);
       // et on navigue vers la page d'accueil qui affiche la liste
       this.router.navigate(["/assignments/matieres/cours/"+this.data.id]);
    });*/
  }

  playPause(video,i) {
    let id = video+i;
    var myVideo: any = document.getElementById(id);
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }


    skip(value,videos,i) {
    let id = videos+i;
    let video: any = document.getElementById(id);
    video.currentTime += value;
  }

  restart(videos,i) {
    let id = videos+i;
    let video: any = document.getElementById(id);
    video.currentTime = 0;
  }



}
