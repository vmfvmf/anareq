import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Sprint} from '../sprint';
import {Projeto} from '../../projeto/projeto';
import {SprintService} from '../sprint.service';

@Component({
    selector: 'app-sprint-lista',
    templateUrl: './sprint-lista.component.html'
})
export class SprintListaComponent implements OnInit {
    private _projeto: Projeto;
    @Input()
    set projeto(obj: Projeto) {this._projeto = obj; this.getSprints(); }
    get projeto() {return this._projeto;}

    sprints: Sprint[];
    sprint: Sprint;
    
    @Output() abreJanela = new EventEmitter<any>();

    constructor(private sprintService: SprintService) {}

    ngOnInit() {
        this.getSprints();
    }

    getSprints(): void {
        this.sprintService.todos_do_projeto(this.projeto.id)
            .subscribe(sprints => this.sprints = sprints);
    }
    
}
