import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { Professeur } from "../model/professeur.model";
import { BasicService } from "./basic.service";
import { LoggingService } from "./login.service";
import { professeurs as professeursData } from 'src/dummy-data/professeurs.data';
import { MatiereService } from "./matiere.service";

@Injectable({
    providedIn: 'root'
})
export class ProfesseurService extends BasicService {

    constructor(private loggingService:LoggingService, private http:HttpClient,
        private matiereService: MatiereService) { super(); }

    static PATH = '/professeurs';

    getProfesseurs():Observable<Professeur[]> {
        return this.http.get<Professeur[]>(this.getUri('/all-professeurs'));
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
        return of(this.matiereService.getMatiere().subscribe((matieres) => {
            var i=0;
            const professeurs: Professeur[] = []
            while(i < matieres.length) {
                const prof = new Professeur();
                prof.id = this.generateId();
                prof.image = professeursData[i].image;
                prof.nom = professeursData[i].nom;
                prof.prenom = professeursData[i].prenom;
                prof.matiere = matieres[i];
                professeurs.push(prof);
                i++;
            }
            return this.addProfesseurs(professeurs).subscribe(() => {

            });
        }));
    }

    getProfesseursPagine(page:number, limit:number):Observable<any> {
        return this.http.get<Professeur[]>(this.getUri(ProfesseurService.PATH)+"?page="+page + "&limit="+limit);
    }

}