/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IAlertMsg} from './../iAlertMsg';

export interface EuFormulario {
    objeto: any;
    gravar(): any;
    aoGravar: EventEmitter<any>;
}

export interface EuCRUD {
    novo(obj: any): Observable<any>;
    gravar(obj: any): Observable<any>;
    todos(): Observable<any[]>;
    deleta(obj: any): Observable<any>;
    detalhes(id: number): Observable<any>;
}



