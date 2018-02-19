import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Projeto} from '../projeto';
import {ProjetoService} from '../projeto.service';
import { FacadeService } from '../../facade.service';

@Component({
    selector: 'app-projeto-lista',
    templateUrl: './projeto-lista.component.html'
})
export class ProjetoListaComponent implements OnInit {

    constructor(private facadeService: FacadeService) {}
    
    projetos: Projeto[];

    ngOnInit() {
        this.facadeService.projetoService.todos()
            .subscribe(projetos => this.projetos = projetos);
    }


}
