import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const token = user.token;
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token).append('UserId', user._id)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}