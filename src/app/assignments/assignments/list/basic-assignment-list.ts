import { Component, Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Assignment } from "src/app/shared/model/assignment.model";
import { AssignmentsService } from "src/app/shared/services/assignments.service";

@Injectable()
export abstract class BasicAssignmentList implements OnInit {
    
    assignments:Assignment[] = [];
    page: number=1;
    limit: number=10;
    totalDocs: number;
    totalPages: number;
    hasPrevPage: boolean;
    prevPage: number;
    hasNextPage: boolean;
    nextPage: number;
    search = "";
    constructor(protected assignmentsService:AssignmentsService,
        protected route:ActivatedRoute,
        protected router:Router) {}

    ngOnInit() {
        console.log('AVANT AFFICHAGE');
        // on regarde s'il y a page= et limit = dans l'URL
        this.route.queryParams.subscribe(queryParams => {
            console.log("Dans le subscribe des queryParams")
            this.page = +queryParams.page || 1;
            this.limit = +queryParams.limit || 10;
    
            this.getAssignments();
        });
        console.log("getAssignments() du service appelé");
    }

    getAssignments(appendData = false) {
        this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
        .subscribe(data => {
          this.assignments = appendData ? [...this.assignments, ...data.docs]: data.docs;
          this.page = data.page;
          this.limit = data.limit;
          this.totalDocs = data.totalDocs;
          this.totalPages = data.totalPages;
          this.hasPrevPage = data.hasPrevPage;
          this.prevPage = data.prevPage;
          this.hasNextPage = data.hasNextPage;
          this.nextPage = data.nextPage;
          console.log("données reçues");
        });
    }

    searchAssignment() {
        
    }

    onDeleteAssignment(event) {
        // event = l'assignment à supprimer

        //this.assignments.splice(index, 1);
        this.assignmentsService.deleteAssignment(event)
            .subscribe(message => {
            console.log(message);
        })
    }

    premierePage() {
        this.router.navigate(['/home'], {
            queryParams: {
            page:1,
            limit:this.limit,
            }
        });
    }

    pageSuivante() {
        /*
        this.page = this.nextPage;
        this.getAssignments();*/
        this.router.navigate(['/home'], {
            queryParams: {
            page:this.nextPage,
            limit:this.limit,
            }
        });
    }


    pagePrecedente() {
        this.router.navigate(['/home'], {
            queryParams: {
            page:this.prevPage,
            limit:this.limit,
            }
        });
    }

    dernierePage() {
        this.router.navigate(['/home'], {
            queryParams: {
            page:this.totalPages,
            limit:this.limit,
            }
        });
    }

}