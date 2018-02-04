import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {User} from './user';
import {MessageService} from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {
    
    private loginUrl = 'http://vmf.localhost/Services/login?x=';  // URL to web api
    //private loginUrl = 'http://vmf.localhost/data';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {}


    /** Do login by username and password. Will 404 if id not found */
    login(username: string, password: string): Observable<User> {
        this.log(`starting loging`)
        let url = this.loginUrl + 'login';
        var data = {username:username, password:password};
        return this.http.post<User>(url,data, httpOptions).pipe(
            tap((item: User) => this.log(`done login w/ name=${item.username} `)),
            catchError(this.handleError<User>('do login'))
          );
    }
    
    usuarioLogado(): Observable<User>{
        this.log(`checking login`);
        let url = this.loginUrl + 'usuarioLogado';
        return this.http.post<User>(url,'', httpOptions).pipe(
            tap((user: User) => this.log(`logged user=${user.username} `)),
            catchError(this.handleError<User>('check logged in '))
          );
    }
    
    deslogar(): Observable<boolean>{
        this.log(`logging out`);
        let url = this.loginUrl + 'deslogar';
        return this.http.post<boolean>(url,'', httpOptions).pipe(
            tap((_) => this.log(`logged out `)),
            catchError(this.handleError<boolean>('check logged in '))
          );
    }
    
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('LoginService: ' + message);
    }

}
