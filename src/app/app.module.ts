import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssigmentComponent } from './assignments/assignments/edit-assigment/edit-assigment.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AssignmentListComponent } from './assignments/assignments/list/assignment-list.component';
import { SimpleAssignmentListComponent } from './assignments/assignments/list/simple-assignment-list/simple-assignment-list.component';
import { DraggableAssignmentListComponent } from './assignments/assignments/list/draggable-assignment-list/draggable-assignment-list.component';
import { TabbedAssignmentListComponent } from './assignments/assignments/list/tabbed-assignment-list/tabbed-assignment-list.component';
import { AssignmentCardListComponent } from './assignments/assignments/list/assignment-card-list/assignment-card-list.component';
import { AssignmentCardComponent } from './assignments/assignments/list/assignment-card/assignment-card.component';
import { AssignmentWithInfiniteScrollComponent } from './assignments/assignments/list/assignment-with-infinite-scroll/assignment-with-infinite-scroll.component';
import { NoteModalComponent } from './assignments/assignments/list/draggable-assignment-list/note-modal/note-modal.component';
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./shared/services/auth.service";
import { ChildGuard } from "./shared/guard/child.guard";
import {MatTableModule} from '@angular/material/table';
import { ProfesseursComponent } from './assignments/professeurs/professeur-list/professeurs.component';
import { DashboardComponent } from './assignments/dashboard/dashboard.component';
import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DynamicDialogComponent } from './components/dynamic-dialog/dynamic-dialog.component';
import { MatiereComponent } from './assignments/matiere/matiere.component';
import { AddElevesComponent } from "./assignments/eleves/add-eleves/add-eleves.component";
import { FileUploadModule } from "ng2-file-upload";
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { EleveAssignmentsComponent } from './assignments/eleves/eleve-assignments/eleve-assignments.component';
import { AssignmentsGroupComponent } from "./assignments/assignments/assignments-group/assignments-group.component";
import { EleveOutletComponent } from "./assignments/eleves/eleve-outlet.component";
import { EleveListComponent } from "./assignments/eleves/eleve-list/eleve-list.component";
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { CoursComponent } from './assignments/matiere/cours/cours.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ModalComponent } from './components/modal/modal.component';
import { ProfesseurOutletComponent } from './assignments/professeurs/professeur-outlet.component';
import { ProfesseurAssignmentComponent } from './assignments/professeurs/professeur-assignment/professeur-assignment.component';

import { MatiereListComponent } from "./assignments/matiere/matiere-list/matiere-list.component";
import { CoursDialogComponent } from "./assignments/matiere/cours-dialog/cours-dialog.component";

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';



const routes: Routes = [
  { 
    path: "", 
    redirectTo: "login", 
    pathMatch: "full"
  },
  { 
    path: "login", 
    component: LoginComponent,
  },
  {
    path: "assignments",
    component: AssignmentsComponent,
    children: [
      {
        path: "",
        component: AssignmentListComponent
      },
      {
        path: "add",
        component: AddAssignmentComponent
      },
      { 
        path: "eleves", 
        component: EleveOutletComponent,
        children: [
          { 
            path: "", 
            component: EleveListComponent
          },    
          { 
            path: "add", 
            component: AddElevesComponent,
          },
          {
            path: "assignments",
            component: EleveAssignmentsComponent
          },
        ]
      },
      { 
        path: "professeurs", 
        component: ProfesseurOutletComponent,
        children: [
          { 
            path: "", 
            component: ProfesseursComponent
          },
          {
            path: "assignments",
            component: ProfesseurAssignmentComponent
          }
        ]
      },
      { 
        path: "matieres", 
        component: MatiereComponent,
        children: [
          { 
            path: "", 
            component: MatiereListComponent,
          },  
          { 
            path: "cours/:id", 
            component: CoursComponent,
          },
        ]
      },
      { 
        path: "dashboard", 
        component: DashboardComponent,
        data: { roles: [ AuthService.ADMIN, AuthService.PROFESSEUR ] }
      },
      {
        path: "detail/:id",
        component: AssignmentDetailComponent
      },
      {
        path: "edit/:id",
        component: EditAssigmentComponent
      }
    ],
    // canActivate: [AuthGuard],    
    canActivateChild: [ChildGuard],
    data: { roles: [ AuthService.ADMIN, AuthService.PROFESSEUR, AuthService.ELEVE ] }
  },
  {
    // idem avec  http://localhost:4200/home
    path: "home",
    redirectTo: "/assignments"
  },
  {
    path: '403',
    component: ForbiddenComponent
  }
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
    AssignmentCardComponent,
    AssignmentWithInfiniteScrollComponent,
    NoteModalComponent,
    ProfesseursComponent,
    DashboardComponent,
    ConfirmDialogComponent,
    DynamicDialogComponent,
    MatiereComponent,
    AddElevesComponent,
    AssignmentsGroupComponent,
    EleveAssignmentsComponent,
    EleveOutletComponent,
    EleveListComponent,
    ToolBarComponent,
    CoursComponent,
    ModalComponent,
    ProfesseurOutletComponent,
    ProfesseurAssignmentComponent,
    MatiereListComponent,
    CoursDialogComponent,
    ForbiddenComponent,
    UserMenuComponent
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
    MatPaginatorModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonToggleModule,
    DragDropModule,
    MatDialogModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    PanelModule,
    ChartModule,
    CalendarModule,
    FileUploadModule,
    MaterialFileInputModule,
    BrowserModule,
    MatGridListModule,
    MatSnackBarModule,
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'dy528ddbe' } as CloudinaryConfiguration),
    RouterModule.forRoot(routes), HttpClientModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
