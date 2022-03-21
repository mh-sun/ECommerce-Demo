import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.login.model';

@Injectable()
export class AddIDInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let user:User=request.body;
    if(request.body!=null){
     
      user.id ='u'+ Math.random();
             console.log('hellooo')
             console.log(user);
    }
    const modified = request.clone({
      body:user
   } );
   return next.handle(modified);
  }
}

