import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Professeur } from "../model/professeur.model";
import { BasicService } from "./basic.service";
import { LoggingService } from "./logging.service";

@Injectable({
    providedIn: 'root'
})
export class ProfesseurService extends BasicService {

    constructor(private loggingService:LoggingService, private http:HttpClient) { super(); }

    PATH = '/professeurs';

    getProfesseur():Observable<Professeur[]> {
        console.log("Dans le service de gestion des Eleves...")
        //return of(this.Eleves);
        return this.http.get<Professeur[]>(this.getUri(this.PATH));
    }

}