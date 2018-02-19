import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Fluxo} from './fluxo';
import {IAlertMsg} from './../iAlertMsg';
import {MessageService} from './../message.service';

import {DbbaseService} from '../dbbase.service';

@Injectable()
export class FluxoService extends DbbaseService {

    constructor(public http: HttpClient, public messageService: MessageService) {
        super(http, messageService);
        this.className = 'fluxo';
    }


    novo(obj: Fluxo): Observable<Fluxo> {
        return super.novo(obj);
    }

    gravar(obj: Fluxo): Observable<boolean | IAlertMsg> {
        return super.gravar(obj);
    }


    todos(): Observable<Fluxo[]> {
        return super.todos();
    }
    
     todos_do_casouso(casouso_id: number): Observable<Fluxo[]> {
        return super.todos_servico_x(casouso_id,'todos_do_casouso');
    }

    deleta(obj: Fluxo | number): Observable<IAlertMsg> {
        return super.deleta(typeof obj === 'number' ? obj : obj.id);

    }

    /** GET hero by id. Will 404 if id not found */
    detalhes(id: number): Observable<Fluxo> {
        return super.detalhes(id);
    }


}
