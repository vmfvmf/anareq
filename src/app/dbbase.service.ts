import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Response} from './response';
import {MessageService} from './message.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class DbbaseService {
    private _className = '';
    set className(arg: string) {
        this._className = arg;
    }
    get className() {
        return this._className;
    }

    private _baseUrl = '';
    set baseUrl(arg: string) {
        this._baseUrl = arg;
    }
    get baseUrl() {
        return this._baseUrl;
    }

    constructor(public http: HttpClient, public messageService: MessageService) {}

    novo(obj: any): Observable<any> {
        this.log(`starting ${this.className}`);
        var url = this.baseUrl + 'novo';
        return this.http.post<any>(url, obj, httpOptions).pipe(
            tap((arg: any) => this.log(`added  ${this.className} w/ id=${arg.id} `)),
            catchError(this.handleError<any>(`add ${this.className}`))
        );
    }

    detalhes(id: number): Observable<any> {
        const url = `${this.baseUrl}detalhes&id=${id}`;
        return this.http.get<any>(url).pipe(
            tap((arg: any) => this.log(`fetched ${this.className} ${arg}`)),
            catchError(this.handleError<any>(`${this.className} id=${id}`))
        );
    }
    
    todos(){
        var url = this.baseUrl + 'todos'; 
        return this.http.post<any[]>(url, { }, httpOptions).pipe(
            tap((vars: any[]) => this.log(`recovered ${vars.length} ${this.className}`)),
            catchError(this.handleError<any[]>(`todos ${this.className} `))
        );
    }
    
    todos_servico_x(algum_id: number, servico: string){
        var url = this.baseUrl + servico; 
        return this.http.post<any[]>(url, {id: algum_id}, httpOptions).pipe(
            tap((vars: any[]) => this.log(`recovered ${vars.length} ${this.className}`)),
            catchError(this.handleError<any[]>(`todos ${this.className} do ${servico} id ${algum_id}`))
        );
    }

    gravar(obj: any): Observable<any> {
        let letObj: Observable<any>;
        this._gravar(obj).forEach(response => letObj = response.data);
        return letObj;
    }

    private _gravar(obj: any): Observable<Response> {
        this.log(`updating ${this.className}`);
        let url = this.baseUrl + 'gravar';
        return this.http.post<Response>(url, obj, httpOptions).pipe(
            tap((r: Response) => this.log(`${this.className} update: ${r.msg} `)),
            catchError(this.handleError<Response>(`update ${this.className}`))
        );
    }
    
    deleta(id: number): Observable<Response> {
        const url = `${this.baseUrl}deleta&id=${id}`;

        return this.http.delete<Response>(url, httpOptions).pipe(
            tap((response: Response) => this.log(`${response.status}:${response.msg} `)),
            catchError(this.handleError<Response>(`deleta ${this.className}`))
        );
    }


    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    log(message: string) {
        this.messageService.add(`${this.className} Service: ` + message);
    }

}
