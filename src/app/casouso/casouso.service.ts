import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Casouso} from './casouso';
import {Response} from './../response';
import {MessageService} from './../message.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CasousoService {
    private className = 'casouso';
    private baseServUrl = 'http://vmf.localhost/Services/casouso?x=';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {}

    novo(casouso: Casouso): Observable<Casouso> {
        this.log(`starting ${this.className}`);
        var novoProjUrl = this.baseServUrl + 'novo';
        return this.http.post<Casouso>(novoProjUrl, casouso, httpOptions).pipe(
            tap((casouso: Casouso) => this.log(`added  ${this.className} w/ id=${casouso.id} `)),
            catchError(this.handleError<Casouso>(`add ${this.className}`))
        );
    }
    
     public gravar(obj: Casouso): Observable<Casouso>{
        let letObj: Observable<Casouso>;
        this._gravar(obj).forEach(response => letObj = response.data);
        return letObj;
    }

    private _gravar(obj: Casouso): Observable<Response> {
        this.log(`updating ${this.className}`);
        let url = this.baseServUrl + 'gravar';
        return this.http.post<Response>(url, obj, httpOptions).pipe(
            tap((r: Response) => this.log(`${this.className} update: ${r.msg} `)),
            catchError(this.handleError<Response>(`update ${this.className}`))
        );
    }

    todos_do_sprint(sprint_id: number): Observable<Casouso[]> {
        var url = this.baseServUrl + 'todos_do_sprint';
        return this.http.post<Casouso[]>(url, {sprint_id: sprint_id}, httpOptions).pipe(
            tap((vars: Casouso[]) => this.log(`recovered ${vars.length} ${this.className}`)),
            catchError(this.handleError<Casouso[]>(`todos ${this.className} do sprint id ${sprint_id}`))
        );
    }

    detalhes(id: number): Observable<Casouso> {
        const url = `${this.baseServUrl}detalhes&id=${id}`;
        return this.http.get<Casouso>(url).pipe(
            tap((casouso: Casouso) => this.log(`fetched ${this.className} UC${casouso.id} - ${casouso.titulo}`)),
            catchError(this.handleError<Casouso>(`${this.className} id=${id}`))
        );
    }
    
    deleta(obj: Casouso | number): Observable<Response> {
        const id = typeof obj === 'number' ? obj : obj.id;
        const url = `${this.baseServUrl}deleta&id=${id}`;

        return this.http.delete<Response>(url, httpOptions).pipe(
            tap((response: Response) => this.log(`${response.status}:${response.msg} `)),
            catchError(this.handleError<Response>(`deleta ${this.className}`))
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
        this.messageService.add('CasoUsoService: ' + message);
    }


}
