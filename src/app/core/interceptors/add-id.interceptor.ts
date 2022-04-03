import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';

@Injectable()
export class AddIDInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   let order:Order=request.body;
  //   if(request.body!=null){
     
  //     order.id ='o'+ Math.random();
  //            console.log('hellooo')
  //            console.log(order);
  //   }
  //   const modified = request.clone({
  //     body:order
  //  } );
   return next.handle(request);
  }
}

