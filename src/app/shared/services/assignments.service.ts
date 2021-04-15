import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Assignment } from '../model/assignment.model';
import { LoggingService } from './login.service';
import { assignmentsGeneres } from '../../../dummy-data/assignments.data';
import { Eleve } from '../model/eleve.model';
import { Matiere } from '../model/matiere.model';
import { ProfesseurService } from './professeur.service';
import { ElevesService } from './eleves.service';
import { Professeur } from '../model/professeur.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[];

  constructor(private loggingService:LoggingService, private http:HttpClient,
    private professeurService: ProfesseurService, private eleveService: ElevesService) { }

  // uri = "http://localhost:8010/api/assignments";
  // base_uri = "http://localhost:8010/api/";
  uri = "https://assignments-backend.herokuapp.com/api/assignments"
  base_uri = "https://assignments-backend.herokuapp.com/api/"

  getAssignments(state=''):Observable<Assignment[]> {
    console.log("Dans le service de gestion des assignments...")
    //return of(this.assignments);
    return this.http.get<Assignment[]>(`${this.uri}?state=${state}`);
  }

  getAssignmentsPagine(page:number, limit:number, state='', criteria=''):Observable<any> {
    return this.http.get<Assignment[]>(`${this.uri}?page=${page}&limit=${limit}&state=${state}&criteria=${criteria}`);
  }

  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getAssignmentsAsPromise():Promise<Assignment[]> {
    console.log("Dans le service de gestion des assignments...")
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri).toPromise();
  }

  getAssignment(id:number):Observable<Assignment> {
    //let assignementCherche = this.assignments.find(a => a.id === id);

    //return of(assignementCherche);

    return this.http.get<Assignment>(this.uri + "/" + id)
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
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  getStudentAssignmentsGroupedByProfessor(id: any):Observable<any> {
    return this.http.get<any>(this.uri + '/eleve/' + id);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  generateId():number {
    return Math.round(Math.random()*100000);
  }

  addAssignment(assignment:Assignment):Observable<any> {
    assignment.id = this.generateId();
    //this.loggingService.log(assignment.nom, " a été ajouté");

    /*this.assignments.push(assignment);


    return of("Service: assignment ajouté !");*/

    return this.http.post(this.uri, assignment);
  }

  addAssignments(assignment: Assignment, eleves: Eleve[]):Observable<any> {
    const assignmentsPromise = [];
    eleves.forEach((e) => {
      const assignment_ = assignment;
      assignment_.eleve = e;
      assignmentsPromise.push(this.addAssignment(assignment_));
    })
    return forkJoin(assignmentsPromise);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // besoin de ne rien faire puisque l'assignment passé en paramètre
    // est déjà un élément du tableau

    //let index = this.assignments.indexOf(assignment);

    //console.log("updateAssignment l'assignment passé en param est à la position " + index + " du tableau");
    this.loggingService.log(assignment.nom, " a été modifié");

    return this.http.put(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    /*
    let index = this.assignments.indexOf(assignment);

    this.assignments.splice(index, 1);
    */


    this.loggingService.log(assignment.nom, " a été supprimé");

    return this.http.delete(this.uri + "/" + assignment._id);

  }

  peuplerBD() {
    assignmentsGeneres.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    })
  }

  // autre version qui permet de récupérer un subscribe une fois que tous les inserts
  // ont été effectués
  peuplerBDAvecForkJoin(eleves: Eleve[], professeurs: Professeur[]): Observable<any> {
    const appelsVersAddAssignment = [];

    assignmentsGeneres.forEach((a) => {
      const nouvelAssignment = new Assignment();
      const randEleve = Math.floor(Math.random() * eleves.length);
      const randProfesseurs = Math.floor(Math.random() * professeurs.length);
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = `${a.nom.charAt(0).toLocaleUpperCase()}${a.nom.substr(1)}`;
      nouvelAssignment.description = a.description;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.professeur = professeurs[randProfesseurs];
      nouvelAssignment.eleve = eleves[randEleve];
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

  // addEleves():Observable<any> {
  //   const ajoutElevePromises = [];
  //   elevesData.forEach((e) => {
  //     const eleve = new Eleve();
  //     eleve.id = e.id;
  //     eleve.image = e.image;
  //     eleve.nom = e.nom;
  //     eleve.prenom = e.prenom;
  //     eleve.sexe = e.sexe;
  //     ajoutElevePromises.push(this.http.post(this.base_uri+'eleves', eleve))
  //   })
  //   return forkJoin(ajoutElevePromises);
  // }
}
