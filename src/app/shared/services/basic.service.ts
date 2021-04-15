import { HttpClient } from "@angular/common/http";
import { LoggingService } from "./login.service";

export class BasicService {

    // static base_uri = "http://localhost:8010/api";
    static base_uri = "https://assignments-backend.herokuapp.com/api"
    // uri = "https://assignments-backend.herokuapp.com/api/assignments"

    // constructor(protected loggingService:LoggingService, 
    //             protected http:HttpClient) { }
    
    getUri(path) {
        return `${BasicService.base_uri}${path}`.replace(/\//g, '/');
    }



    generateId():number {
      return Math.round(Math.random()*100000);
    }

}