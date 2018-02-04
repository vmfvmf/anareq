import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Passo} from './passo';
//import {Response} from './../response';
import {MessageService} from './../message.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PassoService {
private baseServUrl = 'http://vmf.localhost/Services/fluxopasso?x=';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {}

  
   novo(descricao: string, numero: number, fluxo_id: number): Observable<Passo> {
        this.log(`starting passo`);
        var url = this.baseServUrl + 'novo';
        return this.http.post<Passo>(url, {descricao: descricao, numero: numero, fluxo_id: fluxo_id}, httpOptions).pipe(
            tap((item: Passo) => this.log(`added  fluxopasso w/ id=${item.id} `)),
            catchError(this.handleError<Passo>('add fluxopasso'))
        );
    }
    
    todos_do_fluxo(fluxo_id: number): Observable<Passo[]> {
        var url = this.baseServUrl + 'todos_do_fluxo';
        return this.http.post<Passo[]>(url, {fluxo_id: fluxo_id}, httpOptions).pipe(
            tap((vars: Passo[]) => this.log(`recovered ${vars.length} passos do fluxo`)),
            catchError(this.handleError<Passo[]>(`todos fluxos do caso de uso id ${fluxo_id}`))
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
        this.messageService.add('PassoService: ' + message);
    }

}
