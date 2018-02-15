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
        return (obj.fluxopasso_id > 0 ? super.novo_com_relacao(obj,this.relacaoCallback) : super.novo(obj));
    }
    
    relacaoCallback(param: Rn, dbase: DbbaseService): void{
        console.log('com relacao');
        dbase.nova_relacao({'rn_id': <number>param.id, 'fluxopasso_id': <number>param.fluxopasso_id},
            "fluxopassorn");
    }
    
    add_fluxopasso_rn(param: Rn): Observable<any>{
        return super.nova_relacao({'rn_id': <number>param.id, 'fluxopasso_id': <number>param.fluxopasso_id},
            "fluxopassorn");
    }

    gravar(param: Rn): Observable<boolean | IAlertMsg> {
        return super.gravar(param);
    }


    todos(): Observable<Rn[]> {
        return super.todos();
    }
    
    desvinculados_do_passo(passo_id: number): Observable<Rn[]> {
        return super.todos_servico_x(passo_id,'desvinculados_do_passo');
    }

    deleta(param: Rn | number): Observable<IAlertMsg> {
        return super.deleta(typeof param === 'number' ? param : param.id);

    }

    /** GET hero by id. Will 404 if id not found */
    detalhes(id: number): Observable<Rn> {
        return super.detalhes(id);
    }
    
    todos_do_passo(passo_id: number): Observable<Rn[]>{
        return super.todos_servico_x(passo_id,'todos_do_passo');
    }

}
