import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {DbbaseService} from '../dbbase.service';

import {Casouso} from './casouso';
import {IAlertMsg} from './../iAlertMsg';
import {MessageService} from './../message.service';

@Injectable()
export class CasousoService extends DbbaseService {

    constructor(public http: HttpClient, public messageService: MessageService) {
        super(http, messageService); 
        this.className = 'casouso';
        //this.baseUrl += 'casouso?x=';
    }

    novo(obj: Casouso): Observable<Casouso> {
        return super.novo(obj);
    }

    gravar(obj: Casouso): Observable<boolean | IAlertMsg> {
        return super.gravar(obj);
    }
    
    detalhes(id: number): Observable<Casouso> {
        return super.detalhes(id);
    }
    
    deleta(obj: Casouso | number): Observable<IAlertMsg> {
        const id = typeof obj === 'number' ? obj : obj.id;
        const url = `${this.baseUrl}deleta&id=${id}`;

        return super.deleta(id);
    }

    todos_do_sprint(sprint_id: number): Observable<Casouso[]> {
        return super.todos_servico_x(sprint_id, 'todos_do_sprint');
    }

}
