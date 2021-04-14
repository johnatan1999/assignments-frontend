import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from '../model/cours.model';
import { BasicService } from './basic.service';
@Injectable({
  providedIn: 'root'
})
export class CoursService extends BasicService{

  constructor(private http:HttpClient) { super(); }
  PATH = '/cours';

  addCours(cours:Cours):Observable<any> {
    return this.http.post(this.getUri(this.PATH), cours);
  }

  getCoursPagineParMatiere(_id:string):Observable<any> {
    return this.http.get<Cours[]>(this.getUri(this.PATH)+"?id="+_id);
  }
  
}
