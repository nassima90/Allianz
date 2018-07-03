import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent} from '@angular/common/http';
  import { Observable, throwError } from "rxjs";
import { Router } from '@angular/router';

import 'rxjs/add/operator/do';
import { TokenStorage } from './token.storage';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Logger } from './logger';

const TOKEN_HEADER_KEY = 'Authorization';
//Interceptor class implements HttpInterceptor that will intercept all the requests and add a JWT authorization 
//token in the header. Also we can intercept the response and for any unauthorized request or expired 
//token we can redirect user to login page.
@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router, private toast:ToastrService,private log:Logger) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let authReq = req;
    if (this.token.getToken() != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this .token.getToken())});
    }
    //pipe() function let us to combine multiple functions into a single function.
    //next object represents the next interceptor in the chain of interceptors
    //the interceptor inspect the request on the way and forward the request to the handle() method
    //of the next object which imlements the HttpHandler interface. 
    return next.handle(authReq).pipe(catchError(err => {
      if (err.status === 401) {
          // auto logout if 401 response returned from api
        this.toast.error("Erreur d'authentification username/password incorrects");
        this.log.error("Erreur d'authentification username/password incorrects");
        //this.token.signOut();
        //  location.reload(true);
       
      }
       
      const error = err.error.message || err.statusText;
      return throwError(error);
  }))


      

  }
  

}

