import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";

import { AssignmentsComponent } from "./assignments/assignments.component";
import { RenduDirective } from "./shared/rendu.directive";
import { NonRenduDirective } from "./shared/non-rendu.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AssignmentDetailComponent } from "./assignments/assignment-detail/assignment-detail.component";
import { AddAssignmentComponent } from "./assignments/add-assignment/add-assignment.component";
import { Routes, RouterModule } from "@angular/router";
import { EditAssigmentComponent } from "./assignments/edit-assigment/edit-assigment.component";
import { AuthGuard } from "./shared/auth.guard";
import { HttpClientModule } from "@angular/common/http";
import { AssignmentListComponent } from "./assignments/list/assignment-list.component";
import { SimpleAssignmentListComponent } from "./assignments/list/simple-assignment-list/simple-assignment-list.component";
import { DraggableAssignmentListComponent } from "./assignments/list/draggable-assignment-list/draggable-assignment-list.component";
import { TabbedAssignmentListComponent } from "./assignments/list/tabbed-assignment-list/tabbed-assignment-list.component";
import { AssignmentCardListComponent } from "./assignments/list/assignment-card-list/assignment-card-list.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path: "assignments",
    component: AssignmentsComponent,
  },
  {
    // idem avec  http://localhost:4200/home
    path: "home",
    component: AssignmentsComponent,
  },
  {
    path: "add",
    component: AddAssignmentComponent,
  },
  {
    path: "assignment/:id",
    component: AssignmentDetailComponent,
  },
  {
    path: "assignment/:id/edit",
    component: EditAssigmentComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    AssignmentListComponent,
    SimpleAssignmentListComponent,
    DraggableAssignmentListComponent,
    TabbedAssignmentListComponent,
    AssignmentCardListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatSelectModule,
    MatMenuModule,
    MatTabsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
