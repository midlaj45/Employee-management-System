import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
 
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage
 
    if (token) {

      // Clone the request to add the new header

      const clonedRequest = req.clone({

        headers: req.headers.set('Authorization', `Bearer ${token}`)

      });
 
      // Pass the cloned request to the next handler

      return next.handle(clonedRequest);

    } else {

      // If no token, pass the original request

      return next.handle(req);

    }

  }

}

 