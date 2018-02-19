import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

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

    private _baseUrl = 'http://ovnici.us:83/Services/';
    private UrlFileUpload = 'http://ovnici.us:83/Services/upload';
    
    get baseUrl() {
        return this._baseUrl + this.className + '?x=';
    }

    constructor(public http: HttpClient, public messageService: MessageService) {}

    protected novo(obj: any, servico: string = 'novo'): Observable<any> {
        var url = this.baseUrl + servico;
        this.log({msg: `criando ${this.className} url: ${url}`});
        return this.http.post<any>(url, obj, httpOptions).pipe(
            tap((arg: any) => this.log({msg:`Sucesso! Foi adicionado ${this.className} com id ${arg.id} `, tipo: 'success'})),
            catchError(this.handleError<any>(`add ${this.className}`))
        );
    }
    
    protected novo_com_relacao(param: any,callback: (p1:any, p2:any) => void): Observable<any> {
        this.log({msg: `criando novo com relacao`});
        var url = this.baseUrl + 'novo';
        return this.http.post<any>(url, param, httpOptions).pipe(
            tap(
            (sparam: any) => {
                this.log({msg:`Sucesso! Foi adicionado ${this.className} com id ${sparam.id} `, tipo: 'success'});
                callback(sparam, this);
            }),
            catchError(this.handleError<any>(`add ${this.className} com relacao`))
        );
    }
    
     nova_relacao(param: any, relNomeT: string): Observable<any> {
        this.log({msg: `criando relacao ${relNomeT} ${param}`});
        var url = this.baseUrl + relNomeT;
         this.log({msg: `criando relacao ${url}`});
        return this.http.post<any>(url, param, httpOptions).pipe(
            tap((arg: any) => this.log({msg:`Sucesso! Foi adicionado relacao ${relNomeT} com id ${arg} `, tipo: 'success'})),
            catchError(this.handleError<any>(`add relacao ${relNomeT}`))
        );
    }

    protected detalhes(id: number, detalhes: string = 'detalhes'): Observable<any> {
        const url = `${this.baseUrl}${detalhes}&id=${id}`;
        this.log({msg: `recuperando ${this.className} | url: ${url}` });
        return this.http.get<any>(url).pipe(
            tap((arg: any) => {
                this.log( arg?
                    {msg:`recuperado ${this.className} com id ${(<IAlertMsg>arg).msg} `} 
                   : {msg:`nenhum registro encontrado. classname: ${this.className}, servico: ${detalhes}`}
                );
            }),
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
        this.log({msg: `recuperando ${this.className} | url: ${url}` });
        return this.http.post<any[]>(url, {id: algum_id}, httpOptions).pipe(
            tap((vars: any[]) => {
                vars ? this.log({msg: `recuperado ${vars.length} registros do tipo ${this.className} `})
                : this.log({msg: `Nenhum registro encontrado -> ${this.className}`})
            }),
            catchError(this.handleError<any[]>(`todos ${this.className} do ${servico} id ${algum_id}`))
        );
    }

    protected gravar(obj: any): Observable<any> {
        this.log({msg:`atualizando ${this.className}`});
        let url = this.baseUrl + 'gravar';
        return this.http.post<any>(url, obj, httpOptions).pipe(
            tap((retorno: any) => {this.log({msg: `Registro atualizado com sucesso.`, tipo: 'success' })
            ;}),
            catchError(this.handleError<IAlertMsg>(`update ${this.className}`))
        );
    }
    
    protected deleta(id: number, deletaName: string = 'deleta'): Observable<IAlertMsg> {
        const url = `${this.baseUrl}${deletaName}&id=${id}`;
        this.log({msg:`deletando ${this.className} url: ${url}`});
        return this.http.delete<IAlertMsg>(url, httpOptions).pipe(
            tap(( ) => this.log({msg: `Registro excluído com sucesso.`, tipo: 'success' })),
            catchError(this.handleError<IAlertMsg>(`deleta ${this.className}`))
        );
    }

    protected deletaObjComImg(id: number, imgurl: string,deletaName: string = 'deleta'): Observable<IAlertMsg> {
        const url = `${this.baseUrl}${deletaName}&id=${id}&imgurl=${imgurl}`;
        this.log({msg:`deletando ${this.className} url: ${url}`});
        return this.http.delete<IAlertMsg>(url, httpOptions).pipe(
            tap(( ) => this.log({msg: `Registro excluído com sucesso.`, tipo: 'success' })),
            catchError(this.handleError<IAlertMsg>(`deleta ${this.className}`))
        );
    }

    protected enviarArquivo(fileToUpload: File): Observable<IAlertMsg>{
        const _formData = new FormData();
        _formData.append('file', fileToUpload, fileToUpload.name);   
        this.log({msg:`enviando arquivo ${this.className} url: ${this.UrlFileUpload}`});
        return<any>this.http.post(this.UrlFileUpload, _formData).pipe(
            tap((imsg: IAlertMsg) => this.log({msg: `Upload concluído com sucesso.`, tipo: 'success' })),
            catchError(this.handleError<IAlertMsg>(`enviar arquivo ${this.className}`))
         ) ; //note: no HttpHeaders passed as 3d param to POST!
                                                 //So no Content-Type constructed manually.
    }


    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.log(error); // log to console instead
            console.log(result);

            // TODO: better job of transforming error for user consumption
            //
            this.log({msg: `${operation} falhou: ${error.message}, code: ${error.code}`, tipo: 'danger' });

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    log(msg: IAlertMsg) {
        this.messageService.addIAlertMsg(msg);
    }

}
