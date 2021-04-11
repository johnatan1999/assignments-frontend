import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eleve } from 'src/app/shared/model/eleve.model';
import { ElevesService } from 'src/app/shared/services/eleves.service';
@Component({
  selector: 'app-add-eleves',
  templateUrl: './add-eleves.component.html',
  styleUrls: ['./add-eleves.component.css']
})
export class AddElevesComponent implements OnInit {

  constructor(private elevesService:ElevesService,private router:Router) { }

  ngOnInit(): void {
  }


  addEleve(){
    let eleve = new Eleve();
    eleve.nom = "vetso";
    eleve.prenom = "kely";
    eleve.image = "https://robohash.org/reiciendisaccusamusadipisci.png?size=200x200&set=set1";
    eleve.sexe = "F";
    this.elevesService.addEleve(eleve)
    .subscribe(reponse => {
      console.log(reponse.message);
       // et on navigue vers la page d'accueil qui affiche la liste
       this.router.navigate(["/assignments/eleves"]);
    });
  }

}
