import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { BasicService } from "./basic.service";
import { LoggingService } from "./login.service";
import { matieres as matieresData } from 'src/dummy-data/matieres.data';
import { Matiere } from "../model/matiere.model";

@Injectable({
    providedIn: 'root'
})
export class MatiereService extends BasicService {

    constructor(private loggingService:LoggingService, private http:HttpClient) { super(); }

    static PATH = '/matieres';
    static PATHPagination = '/matieres-pagination';

    getMatiere():Observable<Matiere[]> {
        return this.http.get<Matiere[]>(this.getUri(MatiereService.PATH));
    }

    getMatierePagine(page:number, limit:number):Observable<any> {
        return this.http.get<Matiere[]>(this.getUri(MatiereService.PATHPagination)+"?page="+page + "&limit="+limit);
    }

    addMatiere(matiere: Matiere):Observable<any> {
        matiere.id = this.generateId();
        return this.http.post(this.getUri(MatiereService.PATH), matiere);
      }

    addMatieres(professeurs: Matiere[]):Observable<any> {
        const professeursPromise = [];
        professeurs.forEach((p) => {
            professeursPromise.push(this.addMatiere(p));
        })
        return forkJoin(professeursPromise);
    }

    importMatieres(): Observable<any> {
        const matieres: Matiere[] = []
        for(var i in matieresData) {
            const matiere = new Matiere();
            matiere.id = this.generateId();
            matiere.image = matieresData[i].image;
            matiere.nom = matieresData[i].nom;
            matieres.push(matiere);
        }
        return this.addMatieres(matieres);
    }

}