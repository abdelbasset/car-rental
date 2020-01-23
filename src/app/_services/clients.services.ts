import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../_models/client';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const localUrl = 'assets/data/clients.json';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        //'Authorization': 'jwt-token'
    })
};

@Injectable({ providedIn: 'root' })
export class ClientsServices {
    constructor(private http: HttpClient) { }

    getClients(): Observable<any> {
        //httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
        return this.http.get<Client[]>(localUrl, httpOptions).pipe(
            retry(3), catchError(this.handleError<Client[]>('getCars', [])));
    }

    getCarById(id: any): Observable<any> {
        return this.http.get<Client[]>(localUrl).pipe(
            map(
                cars => cars.find(
                    (car: Client) => car.id === id)
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

}