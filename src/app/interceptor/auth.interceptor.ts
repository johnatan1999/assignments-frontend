import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const user = JSON.parse(localStorage.getItem("user"));
        if (user  && req.url!=="https://api.cloudinary.com/v1_1/dy528ddbe/delete_by_token") {
            const token = user.token;
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token).append('UserId', user._id)
            });

            return next.handle(cloned);
        }
        else if(req.url==="https://api.cloudinary.com/v1_1/dy528ddbe/delete_by_token"){
            return next.handle(req);
        }
        else {
            return next.handle(req);
        }
    }
}