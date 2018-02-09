import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Sprint} from './sprint';
import {IAlertMsg} from './../iAlertMsg';
import {MessageService} from './../message.service';

import {DbbaseService} from '../dbbase.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SprintService extends DbbaseService {

    constructor(public http: HttpClient, public messageService: MessageService) {
        super(http, messageService);
        this.className = 'sprint';
    }

     novo(obj: Sprint): Observable<Sprint> {
        return super.novo(obj);
    }

     gravar(obj: Sprint): Observable< boolean |IAlertMsg> {
        return super.gravar(obj);
    }


    todos_do_projeto(id: number): Observable<Sprint[]> {
        return super.todos_servico_x(id,'todos_do_projeto');
    }
    
    deleta(obj: Sprint | number): Observable<IAlertMsg> {
        return super.deleta(typeof obj === 'number' ? obj : obj.id);

    }

    /** GET hero by id. Will 404 if id not found */
    detalhes(id: number): Observable<Sprint> {
        return super.detalhes(id);
    }
}
