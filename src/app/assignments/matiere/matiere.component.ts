import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Matiere } from 'src/app/shared/model/matiere.model';
import { MatiereService } from 'src/app/shared/services/matiere.service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {


  
  constructor() { }

  ngOnInit(): void {
    
  }


}
