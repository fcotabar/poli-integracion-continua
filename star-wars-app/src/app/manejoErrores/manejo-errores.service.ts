import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import Swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManejoErroresService implements HttpInterceptor {  // CONSTRUIMOS  UN INTERCEPTABLE
  // tslint:disable-next-line:variable-name align
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(this.errorApi),
    );
  }
  errorApi(error: HttpErrorResponse) { // creamos el  catch
    if (error.status === 404) { // posibles errores
      return throwError(Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey : false,
        icon: 'error',
        title: 'Oops...',
        html: 'Al parecer tenemos un error con el servicio que está consultando ',
        footer: 'Por favor revisa el estado del servicio &nbsp;' +  ` <a href= ${error.url}>${error.url}</a>`,
      }).then((result) => {
        if (result.value) {

          let timerInterval;
          Swal.fire({
            title: 'Estás siendo redirigido',
            html: 'en <b></b>',
            timer: 500,
            timerProgressBar: true,
            onBeforeOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b');
                  if (b) {
                    b.textContent = String(Swal.getTimerLeft());
                  }
                }
              }, 100);
            },
            onClose: () => {
              clearInterval(timerInterval);
            }
            // tslint:disable-next-line:no-shadowed-variable
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
          return 222;
        }
      }));
    } else if (!navigator.onLine) {
      return throwError(
        Swal.fire(
          'Hemos detectado que no tienes conexión',
          'Verifica su conexión',
          'question'
        ).then((result) => {
          if (result.value) {

            let timerInterval;
            Swal.fire({
              title: 'Conectando nuevamente',
              html: ' en <b></b> milesegundos.',
              timer: 2000,
              timerProgressBar: true,
              onBeforeOpen: () => {
                Swal.showLoading();
                timerInterval = setInterval(() => {
                  const content = Swal.getContent();
                  if (content) {
                    const b = content.querySelector('b');
                    if (b) {
                      b.textContent = String(Swal.getTimerLeft());
                    }
                  }
                }, 100);
              },
              onClose: () => {
                clearInterval(timerInterval);
              }
              // tslint:disable-next-line:no-shadowed-variable
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer');
              }
            });
            return 222;
          }
        })
      );
    }
  }
}
