import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { LoggingService } from './login.service';
import { elevesData } from '../../../dummy-data/eleves.data';
import { Eleve } from '../model/eleve.model';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root'
})
export class ElevesService extends BasicService {

  Eleves:Eleve[];

  constructor(private loggingService:LoggingService, private http:HttpClient) { super(); }

  PATH = '/eleves';

  addEleve(eleve:Eleve):Observable<any> {
    eleve.id = this.generateId();

    return this.http.post(this.getUri(this.PATH), eleve);
  }

  getEleves():Observable<any[]> {
    console.log("Dans le service de gestion des Eleves...")
    //return of(this.Eleves);
    return this.http.get<Eleve[]>(this.getUri('/all-eleves'));
  }

  getElevesPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Eleve[]>(this.getUri(this.PATH)+"?page="+page + "&limit="+limit);
  }

  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getElevesAsPromise():Promise<Eleve[]> {
    console.log("Dans le service de gestion des Eleves...")
    //return of(this.Eleves);
    return this.http.get<Eleve[]>(this.getUri(this.PATH)).toPromise();
  }

  getEleve(id:number):Observable<Eleve> {
    //let assignementCherche = this.Eleves.find(a => a.id === id);

    //return of(assignementCherche);
    return this.http.get<Eleve>(this.getUri(this.PATH) + "/" + id)
    .pipe(
      // traitement 1
      map(a => {
        // a.nom += " MODIFIE PAR MAP";
        return a;
      }),
      tap(a => {
        console.log("TRACE DANS TAP : j'ai reçu " + a.nom);
      }),
      /*
      filter(a => {
        return (a.rendu)
      })
      */
      catchError(this.handleError<any>('### catchError: getEleves by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  importEleve():Observable<any> {
    const ajoutElevePromises = [];
    elevesData.forEach((e) => {
      const eleve = new Eleve();
      eleve.id = this.generateId();
      eleve.image = e.image;
      eleve.nom = e.nom;
      eleve.prenom = e.prenom;
      eleve.sexe = e.sexe;
      ajoutElevePromises.push(this.http.post(this.getUri(this.PATH), eleve))
    })
    return forkJoin(ajoutElevePromises);
  }


}
