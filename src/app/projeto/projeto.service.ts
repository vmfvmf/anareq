import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Projeto} from './projeto';
import {Response} from './../response';
import {MessageService} from './../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjetoService {
    private projUrl = 'http://vmf.localhost/Services/projeto?x=';  // URL to web api
    

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {}

    novo(nome: string, descricao: string): Observable<Projeto> {
        this.log(`starting projeto`);
        var novoProjUrl = this.projUrl + 'novo';
        var data = {nome: nome, descricao: descricao};
        return this.http.post<Projeto>(novoProjUrl, data, httpOptions).pipe(
            tap((projeto: Projeto) => this.log(`added  projeto w/ id=${projeto.id} `)),
            catchError(this.handleError<Projeto>('add projeto'))
        );
    }
    
    todosProjetos(): Observable<Projeto[]> {
        var todosProjUrl = this.projUrl + 'todos';
        return this.http.post<Projeto[]>(todosProjUrl, {}, httpOptions).pipe(
            tap((projetos: Projeto[]) => this.log(`recovered ${projetos.length} projetos`)),
            catchError(this.handleError<Projeto[]>('add projeto'))
        );
    }
    
    /** DELETE: delete the projeto from the server */
  deletaProjeto (projeto: Projeto | number): Observable<Response> {
    const id = typeof projeto === 'number' ? projeto : projeto.id;
    const url = `${this.projUrl}deleta&id=${id}`;

    return this.http.delete<Response>(url, httpOptions).pipe(
        tap((response: Response) => this.log(`${response.status}:${response.msg} `)),
      catchError(this.handleError<Response>('deletaProjeto'))
    );
  }
  
   /** GET hero by id. Will 404 if id not found */
  detalhes(id: number): Observable<Projeto> {
    const url = `${this.projUrl}detalhes&id=${id}`;
    return this.http.get<Projeto>(url).pipe(
      tap((p: Projeto) => this.log(`fetched projeto id=${p.id}`)),
      catchError(this.handleError<Projeto>(`projeto detalhes`))
    );
  }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('ProjetoService: ' + message);
    }

}
