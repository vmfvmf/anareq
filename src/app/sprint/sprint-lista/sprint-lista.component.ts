import {Component, Input, OnInit } from '@angular/core';
import {Sprint} from '../sprint';
import {Projeto} from '../../projeto/projeto';
import {SprintService} from '../sprint.service';

@Component({
    selector: 'app-sprint-lista',
    templateUrl: './sprint-lista.component.html'
})
export class SprintListaComponent implements OnInit {
    @Input() projeto: Projeto;

    sprints: Sprint[];
    sprint: Sprint;

    constructor(private sprintService: SprintService) {}

    ngOnInit() {
        this.getSprints();
    }

    getSprints(): void {
        this.sprintService.todos_do_projeto(this.projeto.id)
            .subscribe(sprints => this.sprints = sprints);
    }

}
