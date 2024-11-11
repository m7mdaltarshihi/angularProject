import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        let msg = '';
        switch (error.status) {
          case 404:
            this.router.navigate(['/error404'])
            break;
          case 401:

            this.router.navigate(['/error401'])
            break;
          case 403:
            this.router.navigate(['/error403']);
            break;
          default:
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Something went wrong!",
              showConfirmButton: false,
              timer: 5000
            });
            break;
        }
        return throwError(msg)
      })
    )
  }
}
