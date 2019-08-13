import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.credentials) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${currentUser.credentials}`
                }
            });
        }

        return next.handle(request);
    }
}