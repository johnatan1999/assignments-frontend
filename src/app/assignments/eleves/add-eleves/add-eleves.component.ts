import { Component, Input, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Eleve } from 'src/app/shared/model/eleve.model';
import { ElevesService } from 'src/app/shared/services/eleves.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';

import { HttpClient } from '@angular/common/http';

import { Cloudinary } from '@cloudinary/angular-5.x';
@Component({
  selector: 'app-add-eleves',
  templateUrl: './add-eleves.component.html',
  styleUrls: ['./add-eleves.component.css']
})
export class AddElevesComponent implements OnInit {
  /*nom = new FormControl('johnatan', [Validators.required]);
  prenom = new FormControl('john', [Validators.required]);
  image = new FormControl('john', [Validators.required]);
  sexe = new FormControl('F', [Validators.required]);
  sexes: any[] = [
    {value: 'F', viewValue: 'Féminin'},
    {value: 'M', viewValue: 'Masculin'},
  ];
  
  eleveFormGroup: FormGroup;*/
  /*constructor(private elevesService:ElevesService,private router:Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  
  }*/



  /*getErrorMessage() {
    if (this.nom.hasError('required') || this.prenom.hasError('required') || this.image.hasError('required') || this.sexe.hasError('required')) {
      return 'You must enter a value';
    }
  }


  addEleve(){
    if((!this.nom.value) || (!this.prenom.value) || (!this.image.value) || (!this.sexe.value)) return;
    console.log(this.nom);
    console.log(this.prenom);
    console.log(this.image);
    console.log(this.sexe);
    let eleve = new Eleve();
    eleve.nom = this.nom.value;
    eleve.prenom = this.prenom.value;
    eleve.image = this.image.value;
    eleve.sexe = this.sexe.value;
    this.elevesService.addEleve(eleve)
    .subscribe(reponse => {
      console.log(reponse.message);
       // et on navigue vers la page d'accueil qui affiche la liste
       this.router.navigate(["/assignments/eleves"]);
    });
  }*/

  /*nom = new FormControl('johnatan', [Validators.required]);
  prenom = new FormControl('john', [Validators.required]);
  image = new FormControl('john', [Validators.required]);
  sexe = new FormControl('F', [Validators.required]);
  sexes: any[] = [
    {value: 'F', viewValue: 'Féminin'},
    {value: 'M', viewValue: 'Masculin'},
  ];
  
  eleveFormGroup: FormGroup;*/
  /*constructor(private elevesService:ElevesService,private router:Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  
  }*/



  /*getErrorMessage() {
    if (this.nom.hasError('required') || this.prenom.hasError('required') || this.image.hasError('required') || this.sexe.hasError('required')) {
      return 'You must enter a value';
    }
  }


  addEleve(){
    if((!this.nom.value) || (!this.prenom.value) || (!this.image.value) || (!this.sexe.value)) return;
    console.log(this.nom);
    console.log(this.prenom);
    console.log(this.image);
    console.log(this.sexe);
    let eleve = new Eleve();
    eleve.nom = this.nom.value;
    eleve.prenom = this.prenom.value;
    eleve.image = this.image.value;
    eleve.sexe = this.sexe.value;
    this.elevesService.addEleve(eleve)
    .subscribe(reponse => {
      console.log(reponse.message);
       // et on navigue vers la page d'accueil qui affiche la liste
       this.router.navigate(["/assignments/eleves"]);
    });
  }*/


  @Input()
  responses: Array<any>;

  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;
  private title: string;

  files: any[] = [];

  nom = new FormControl('johnatan', [Validators.required]);
  prenom = new FormControl('john', [Validators.required]);
  image = new FormControl('john', [Validators.required]);
  sexe = new FormControl('F', [Validators.required]);
  sexes: any[] = [
    {value: 'F', viewValue: 'Féminin'},
    {value: 'M', viewValue: 'Masculin'},
  ];

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    private elevesService:ElevesService,private router:Router, private _formBuilder: FormBuilder
  ) {
    this.responses = [];
    this.title = '';
  }

  ngOnInit(): void {
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
      console.log(this.image.value);
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

      
    };

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


  onChange(event,fileInput,image){
    console.log(event);
    console.log(fileInput);
    console.log(image);
  }

  getUrlFromResponse(){
    this.responses.forEach((response)=>{
      let datas = this.getFileProperties(response.data);
      datas.forEach((data)=>{
        this.image.setValue(data.url);
      })
    })
  }

  updateTitle(value: string) {
    this.title = value;
  }

  // Delete an uploaded image
  // Requires setting "Return delete token" to "Yes" in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().dy528ddbe}/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: data.delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
  };

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ 'key': key, 'value': fileProperties[key] , url:fileProperties['url']}));
  }
  getErrorMessage() {
    if (this.nom.hasError('required') || this.prenom.hasError('required') || this.image.hasError('required') || this.sexe.hasError('required')) {
      return 'You must enter a value';
    }
  }

  addEleve(){
    if((!this.nom.value) || (!this.prenom.value) || (!this.image.value) || (!this.sexe.value)) return;
    this.getUrlFromResponse();
    /*console.log(this.nom.value);
    console.log(this.prenom.value);
    console.log(this.image.value);
    console.log(this.sexe.value);*/

    let eleve = new Eleve();
    eleve.nom = this.nom.value;
    eleve.prenom = this.prenom.value;
    eleve.image = this.image.value;
    eleve.sexe = this.sexe.value;
    this.elevesService.addEleve(eleve)
    .subscribe(reponse => {
      console.log(reponse.message);
       // et on navigue vers la page d'accueil qui affiche la liste
       this.router.navigate(["/assignments/eleves"]);
    });
  }
  
  

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
