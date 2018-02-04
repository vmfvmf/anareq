import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Sprint} from './sprint';
import {Response} from './../response';
import {MessageService} from './../message.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SprintService {
    private baseServUrl = 'http://vmf.localhost/Services/sprint?x=';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {}

    novo(s: Sprint): Observable<Sprint> {
        this.log(`starting sprint`);
        var url = this.baseServUrl + 'novo';
        //var data = {numero: numero, projeto_id: projeto_id};
        return this.http.post<Sprint>(url, s, httpOptions).pipe(
            tap((sprint: Sprint) => this.log(`added  Sprint w/ id=${sprint.id} `)),
            catchError(this.handleError<Sprint>(`novo sprint`))
        );
    }
    
    public gravar(s: Sprint): Observable<Sprint>{
        let sprint: Observable<Sprint>;
        this._gravar(s).forEach(response => sprint = response.data);
        return sprint;
    }

    private _gravar(s: Sprint): Observable<Response> {
        this.log(`updating sprint`);
        let url = this.baseServUrl + 'gravar';
        //var data = {numero: numero, projeto_id: projeto_id};
        return this.http.post<Response>(url, s, httpOptions).pipe(
            tap((r: Response) => this.log(`sprint update: ${r.msg} `)),
            catchError(this.handleError<Response>(`update sprint`))
        );
    }

    todos(projId: number): Observable<Sprint[]> {
        var todosSprintsUrl = this.baseServUrl + 'todos';
        return this.http.post<Sprint[]>(todosSprintsUrl, {projeto_id: projId}, httpOptions).pipe(
            tap((sprints: Sprint[]) => this.log(`recovered ${sprints.length} sprints`)),
            catchError(this.handleError<Sprint[]>(`todos sprints do projeto id ${projId}`))
        );
    }

    /** DELETE: delete the sprint from the server */
    deleta(sprint: Sprint | number): Observable<Response> {
        const id = typeof sprint === 'number' ? sprint : sprint.id;
        const url = `${this.baseServUrl}deleta&id=${id}`;

        return this.http.delete<Response>(url, httpOptions).pipe(
            tap((response: Response) => this.log(`${response.status}:${response.msg} `)),
            catchError(this.handleError<Response>('deletaSprint'))
        );
    }

    detalhes(id: number): Observable<Sprint> {
        const url = `${this.baseServUrl}detalhes&id=${id}`;
        return this.http.get<Sprint>(url).pipe(
            tap((sprint: Sprint) => this.log(`fetched sprint id=${id}, numero=${sprint.numero}`)),
            catchError(this.handleError<Sprint>(`sprint id=${id}`))
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
        this.messageService.add('SprintService: ' + message);
    }


}
