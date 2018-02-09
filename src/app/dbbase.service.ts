import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {IAlertMsg} from './iAlertMsg';
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

    private _baseUrl = 'http://177.95.60.69:83/Services/';
    
    get baseUrl() {
        return this._baseUrl + this.className + '?x=';
    }

    constructor(public http: HttpClient, public messageService: MessageService) {}

    protected novo(obj: any): Observable<any> {
        this.log({msg: `criando ${this.className}`});
        var url = this.baseUrl + 'novo';
        return this.http.post<any>(url, obj, httpOptions).pipe(
            tap((arg: any) => this.log({msg:`Sucesso! Foi adicionado ${this.className} com id ${arg.id} `, tipo: 'success'})),
            catchError(this.handleError<any>(`add ${this.className}`))
        );
    }

    detalhes(id: number): Observable<any> {
        this.log({msg: `recuperando ${this.className}`});
        const url = `${this.baseUrl}detalhes&id=${id}`;
        return this.http.get<any>(url).pipe(
            tap((arg: any) => this.log({msg:`recuperado ${this.className} com id ${arg.id} `})),
            catchError(this.handleError<any>(`${this.className} id=${id}`))
        );
    }
    
    protected todos(){
        this.log({msg: `recuperando todos ${this.className}`});
        var url = this.baseUrl + 'todos'; 
        return this.http.post<any[]>(url, { }, httpOptions).pipe(
            tap((vars: any[]) => this.log({msg: `recuperado ${vars.length} registros do tipo ${this.className} `})),
            catchError(this.handleError<any[]>(`todos ${this.className} `))
        );
    }
    
    protected todos_servico_x(algum_id: number, servico: string){
        var url = this.baseUrl + servico; 
        return this.http.post<any[]>(url, {id: algum_id}, httpOptions).pipe(
            tap((vars: any[]) => this.log({msg: `recuperado ${vars.length} registros do tipo ${this.className} `})),
            catchError(this.handleError<any[]>(`todos ${this.className} do ${servico} id ${algum_id}`))
        );
    }

    gravar(obj: any): Observable<boolean | IAlertMsg> {
        this.log({msg:`atualizando ${this.className}`});
        let url = this.baseUrl + 'gravar';
        return this.http.post<boolean>(url, obj, httpOptions).pipe(
            tap((_) => this.log({msg: `Registro atualizado com sucesso.`, tipo: 'success' })),
            catchError(this.handleError<IAlertMsg>(`update ${this.className}`))
        );
    }
    
    deleta(id: number): Observable<IAlertMsg> {
        const url = `${this.baseUrl}deleta&id=${id}`;

        return this.http.delete<IAlertMsg>(url, httpOptions).pipe(
            tap((_) => this.log({msg: `Registro excluído com sucesso.`, tipo: 'success' })),
            catchError(this.handleError<IAlertMsg>(`deleta ${this.className}`))
        );
    }


    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //
            this.log({msg: `${operation} falhou: ${error.message}`, tipo: 'danger' });

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    log(msg: IAlertMsg) {
        this.messageService.addIAlertMsg(msg);
    }

}
