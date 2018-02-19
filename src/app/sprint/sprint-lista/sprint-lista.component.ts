import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Sprint} from '../sprint';
import {Projeto} from '../../projeto/projeto';
import {SprintService} from '../sprint.service';
import { FacadeService } from '../../facade.service';

@Component({
    selector: 'app-sprint-lista',
    templateUrl: './sprint-lista.component.html'
})
export class SprintListaComponent implements OnInit {
    get sprints(){ return this.facadeService.projeto.sprints;}
    constructor(private facadeService: FacadeService) {}

    ngOnInit() {
        this.facadeService.sprintService.todos_do_projeto(this.facadeService.projeto.id)
            .subscribe(sprints => this.facadeService.projeto.sprints = sprints);
    }

    
}
