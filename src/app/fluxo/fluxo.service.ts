import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Fluxo} from './fluxo';
//import {Response} from './../response';
import {MessageService} from './../message.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class FluxoService {
    private baseServUrl = 'http://vmf.localhost/Services/fluxo?x=';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {}

    novo(fluxo: Fluxo): Observable<Fluxo> {
        this.log(`starting fluxo`);
        var url = this.baseServUrl + 'novo';
        return this.http.post<Fluxo>(url, fluxo, httpOptions).pipe(
            tap((fluxo: Fluxo) => this.log(`added  fluxo w/ id=${fluxo.id} `)),
            catchError(this.handleError<Fluxo>('add fluxo'))
        );
    }
    
    todos_do_casouso(casouso_id: number): Observable<Fluxo[]> {
        //if(casouso_id > 0) return null;
        var url = this.baseServUrl + 'todos_do_casouso';
        return this.http.post<Fluxo[]>(url, {casouso_id: casouso_id}, httpOptions).pipe(
            tap((vars: Fluxo[]) => this.log(`recovered ${vars.length} fluxos`)),
            catchError(this.handleError<Fluxo[]>(`todos fluxos do caso de uso id ${casouso_id}`))
        );
    }
    
    detalhes(id: number): Observable<Fluxo> {
        const url = `${this.baseServUrl}detalhes&id=${id}`;
        return this.http.get<Fluxo>(url).pipe(
            tap((fluxo: Fluxo) => this.log(`fetched fluxo UC${fluxo.sigla} - ${fluxo.titulo}`)),
            catchError(this.handleError<Fluxo>(`fluxo id=${id}`))
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
        this.messageService.add('FluxoService: ' + message);
    }
}
