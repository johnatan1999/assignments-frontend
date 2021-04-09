import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BasicService{

  constructor(private http:HttpClient) { super(); }
  dashboardPath = '/dashboard';
  dashboardAssignmentsPath = '/dashboard-assignments';

  getDashboard():Observable<any[]> {
    console.log("Dans le service de gestion des dashboard...")
    return this.http.get<any>(this.getUri(this.dashboardPath));
  }

  getAssignmentDashboard():Observable<any[]> {
    console.log("Dans le service de gestion des dashboard assignments...")
    return this.http.get<any>(this.getUri(this.dashboardAssignmentsPath));
  }


}
