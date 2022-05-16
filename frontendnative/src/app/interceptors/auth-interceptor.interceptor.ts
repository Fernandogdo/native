import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Global } from '../services/global/global';
import Swal from 'sweetalert2';


@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

    public url: string


    constructor() {
        this.url = Global.url;

    }


    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const token = localStorage.getItem('token')

        // const login = this.url + 'login'

        const login = '/login';
        const users = '/users'


        let reqClone;

        if (token) {
            if (!request.url.includes(login)) {

                reqClone = request.clone({
                    setHeaders: {
                        'x-token': token
                    }
                })
            }

        } else {
            reqClone = request
            console.log("🚀 ~ file: auth-interceptor.interceptor.ts ~ line 48 ~ AuthInterceptorInterceptor ~ intercept ~ reqClone", reqClone)
        }


        return next.handle(reqClone)
            .pipe(
                catchError(this.manageError)
            )
    }


    manageError(error: HttpErrorResponse) {
        console.log('Error en interceptor')

        Swal.fire('Error', 'No tiene los permisos para acceder', 'error')

        return throwError(() => ("Error en Interceptor"))
    }
}