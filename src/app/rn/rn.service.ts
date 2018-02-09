import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Rn} from './rn';
import {IAlertMsg} from './../iAlertMsg';
import {MessageService} from './../message.service';

import {DbbaseService} from '../dbbase.service';

@Injectable()
export class RnService extends DbbaseService {

    constructor(public http: HttpClient, public messageService: MessageService) {
        super(http, messageService);
        this.className = 'rn';
        // http://177.95.60.69:85/Services/rn?x=
    }

    novo(obj: Rn): Observable<Rn> {
        return super.novo(obj);
    }

    gravar(obj: Rn): Observable<boolean | IAlertMsg> {
        return super.gravar(obj);
    }


    todos(): Observable<Rn[]> {
        return super.todos();
    }

    deleta(obj: Rn | number): Observable<IAlertMsg> {
        return super.deleta(typeof obj === 'number' ? obj : obj.id);

    }

    /** GET hero by id. Will 404 if id not found */
    detalhes(id: number): Observable<Rn> {
        return super.detalhes(id);
    }
    
    todos_do_passo(passo_id: number): Observable<Rn[]>{
        return super.todos_servico_x(passo_id,'todos_do_passo');
    }

}
