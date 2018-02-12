import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Projeto} from './projeto';
import {IAlertMsg} from './../iAlertMsg';
import {MessageService} from './../message.service';

import {DbbaseService} from '../dbbase.service';

import {EuCRUD} from '../Interfaces/MinhasInterfaces';

@Injectable()
export class ProjetoService extends DbbaseService implements EuCRUD {

    constructor(public http: HttpClient, public messageService: MessageService) {
        super(http, messageService);
        this.className = 'projeto';
        // http://177.95.60.69:85/Services/projeto?x=
    }


    novo(obj: Projeto): Observable<Projeto> {
        return super.novo(obj);
    }

    gravar(obj: Projeto): Observable<Projeto> {
        return super.gravar(obj);
    }


    todos(): Observable<Projeto[]> {
        return super.todos();
    }

    deleta(obj: Projeto | number): Observable<IAlertMsg> {
        return super.deleta(typeof obj === 'number' ? obj : obj.id);

    }

    /** GET hero by id. Will 404 if id not found */
    detalhes(id: number): Observable<Projeto> {
        return super.detalhes(id);
    }

}
