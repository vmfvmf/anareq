import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Projeto} from '../projeto';
import {ProjetoService} from '../projeto.service';

@Component({
    selector: 'app-projeto-lista',
    templateUrl: './projeto-lista.component.html'
})
export class ProjetoListaComponent implements OnInit {

    constructor(private projetoService: ProjetoService) {}
    
    projetos: Projeto[];

     @Output() abreJanela = new EventEmitter<any>();
    
    ngOnInit() {
        this.getProjetos();
    }

    getProjetos(): void {
        this.projetoService.todos()
            .subscribe(projetos => this.projetos = projetos);
    }

}
