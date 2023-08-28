import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, Subscriber, catchError, delay, of } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {


  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable=new Observable( (subscriber:Subscriber<ValidationErrors | null >)=>{

      console.log(email);
      if(email ==="fernando@google.com"){
        subscriber.next({emailTaken:true});
        subscriber.complete();
        return;
      }
      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay(3000)
    )

    return httpCallObservable;
  }
    /*
    ********************************** EJEMPLO *********************************************

    return this.http.gert<string>(`http://miservicio.com`)
    .pipe(
      map( respuesta=>respuesta),
      catchError(()=>of(false))
    );

    *****************************************************************************************
*/
    /*return of({
      emailTaken: true
    }).pipe(
      delay( 2000 )
    );*/


  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }



}
