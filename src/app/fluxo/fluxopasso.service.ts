import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Passo} from './passo';
import {IAlertMsg} from './../iAlertMsg';
import {MessageService} from './../message.service';

import {DbbaseService} from '../dbbase.service';

@Injectable()
export class PassoService extends DbbaseService {

    constructor(public http: HttpClient, public messageService: MessageService) {
        super(http, messageService);
        this.className = 'fluxopasso';
    }


    novo(obj: Passo): Observable<Passo> {
        return super.novo(obj);
    }

    gravar(obj: Passo): Observable<boolean | IAlertMsg> {
        return super.gravar(obj);
    }


    todos(): Observable<Passo[]> {
        return super.todos();
    }
    
    todos_do_fluxo(fluxo_id: number): Observable<Passo[]> {
        return super.todos_servico_x(fluxo_id,'todos_do_fluxo');
    }

    deleta(obj: Passo | number): Observable<IAlertMsg> {
        return super.deleta(typeof obj === 'number' ? obj : obj.id);

    }

    /** GET hero by id. Will 404 if id not found */
    detalhes(id: number): Observable<Passo> {
        return super.detalhes(id);
    }

}
