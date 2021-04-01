export class BasicService {

    static base_uri = "http://localhost:8010/api";
    // uri = "https://assignments-backend.herokuapp.com/api/assignments"
  // base_uri = "https://assignments-backend.herokuapp.com/api/"
    
    getUri(path) {
        return `${BasicService.base_uri}${path}`.replace(/\//g, '/');
    }

    generateId():number {
      return Math.round(Math.random()*100000);
    }
}