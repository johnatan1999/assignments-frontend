export class BasicService {

    static base_uri = "http://localhost:8010/api";
  // base_uri = "https://assignments-backend.herokuapp.com/api/"
  // uri = "https://assignments-backend.herokuapp.com/api/assignments"
    
    getUri(path) {
        return `${BasicService.base_uri}${path}`.replace(/\//g, '/');
    }

}