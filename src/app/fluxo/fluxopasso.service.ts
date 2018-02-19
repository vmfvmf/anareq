import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Fluxopasso} from './fluxopasso';
import {Fluxopassoesboco} from './fluxopassoesboco';
import {IAlertMsg} from './../iAlertMsg';
import {MessageService} from './../message.service';

import {DbbaseService} from '../dbbase.service';

@Injectable()
export class FluxopassoService extends DbbaseService {

    constructor(public http: HttpClient, public messageService: MessageService) {
        super(http, messageService);
        this.className = 'fluxopasso';
    }


    novo(obj: Fluxopasso): Observable<Fluxopasso> {
        return super.novo(obj);
    }
    
    novoEsboco(obj: Fluxopassoesboco): Observable<Fluxopassoesboco> {
        return super.novo(obj, 'novo_esboco');
    }

    gravar(obj: Fluxopasso): Observable<boolean | IAlertMsg> {
        return super.gravar(obj);
    }


    todos(): Observable<Fluxopasso[]> {
        return super.todos();
    }
    
    todos_do_fluxo(fluxo_id: number): Observable<Fluxopasso[]> {
        return super.todos_servico_x(fluxo_id,'todos_do_fluxo');
    }

    deleta(obj: Fluxopasso | number): Observable<IAlertMsg> {
        return super.deleta(typeof obj === 'number' ? obj : obj.id);

    }

    deletaEsboco(obj: Fluxopassoesboco): Observable<IAlertMsg> {
        return super.deletaObjComImg(obj.fluxopasso_id, obj.imgurl, 'deleta_esboco');
    }

    /** GET hero by id. Will 404 if id not found */
    detalhes(id: number): Observable<Fluxopasso> {
        return super.detalhes(id);
    }

    getEsboco(fluxopasso_id: number): Observable<Fluxopassoesboco> {
        return super.detalhes(fluxopasso_id, 'get_esboco');
    }

    carregarArquivo(file: File): Observable<any>{
        return super.enviarArquivo(file);
    }

}
