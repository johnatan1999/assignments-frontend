import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { Professeur } from "../model/professeur.model";
import { BasicService } from "./basic.service";
import { LoggingService } from "./login.service";
import { professeurs as professeursData } from 'src/dummy-data/professeurs.data';

@Injectable({
    providedIn: 'root'
})
export class ProfesseurService extends BasicService {

    constructor(private loggingService:LoggingService, private http:HttpClient) { super(); }

    static PATH = '/professeurs';

    getProfesseur():Observable<Professeur[]> {
        console.log("Dans le service de gestion des Eleves...")
        //return of(this.Eleves);
        return this.http.get<Professeur[]>(this.getUri(ProfesseurService.PATH));
    }

    addProfesseur(professeur: Professeur):Observable<any> {
        professeur.id = this.generateId();
        return this.http.post(this.getUri(ProfesseurService.PATH), professeur);
      }

    addProfesseurs(professeurs: Professeur[]):Observable<any> {
        const professeursPromise = [];
        professeurs.forEach((p) => {
            professeursPromise.push(this.addProfesseur(p));
        })
        return forkJoin(professeursPromise);
    }

    importProfesseurs(): Observable<any> {
        var i=0;
        const professeurs: Professeur[] = []
        while(i < 8) {
            const prof = new Professeur();
            prof.id = this.generateId();
            prof.image = professeursData[i].image;
            prof.nom = professeursData[i].nom;
            prof.prenom = professeursData[i].prenom;
            prof.matiere = professeursData[i].matiere;
            professeurs.push(prof);
            i++;
        }
        return this.addProfesseurs(professeurs);
    }

    getProfesseursPagine(page:number, limit:number):Observable<any> {
        return this.http.get<Professeur[]>(this.getUri(ProfesseurService.PATH)+"?page="+page + "&limit="+limit);
    }

}