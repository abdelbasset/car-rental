import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Car } from './_models/car';
import { retry, catchError, map, tap, filter } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const localUrl = 'assets/data/cars.json';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getCars(): Observable<any> {
    //httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.get<Car[]>(localUrl, httpOptions).pipe(
      retry(3), catchError(this.handleError<Car[]>('getCars', [])));
  }

  getCarById(id: any): Observable<any> {
    return this.http.get<Car[]>(localUrl).pipe(
      map(
        cars => cars.find(
        (car: Car) => car.id_car === id)
      ));
     // retry(3), catchError(this.handleError<Car>('getCars')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }

  addCar(car: Car): Observable<Car> {
    console.log(car);
    return this.http.post<Car>(localUrl, car, httpOptions)
      .pipe(
        catchError(this.handleError('addCar', car))
      );
  }

  updateCar(id: any, car: Car): Observable<Car> {
    return this.http.put<Car>(localUrl + id, car, httpOptions)
      .pipe(
        catchError(this.handleError('addCar', car))
      );
  }
  
  deleteCar(id: any, car: Car): Observable<Car> {
    return this.http.delete<Car>(localUrl + id, httpOptions)
      .pipe(
        catchError(this.handleError('addCar', car))
      );
  }

}
