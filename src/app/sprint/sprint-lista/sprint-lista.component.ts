import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Sprint} from '../sprint';
import {SprintService} from '../sprint.service';

@Component({
    selector: 'app-sprint-lista',
    templateUrl: './sprint-lista.component.html'
})
export class SprintListaComponent implements OnInit {
    @Input() projeto_id: number;
    
    sprints: Sprint[];

    @Output() aoCriarSp = new EventEmitter<any>();
    @Output() aoEditarSp = new EventEmitter<Sprint>();

    constructor(private sprintService: SprintService) {}

    ngOnInit() {
        this.getSprints();
    }

    getSprints(): void {
        this.sprintService.todos(this.projeto_id)
            .subscribe(sprints => this.sprints = sprints);
    }


    delete(sprint: Sprint): void {
        this.sprintService.deleta(sprint).subscribe();
        this.getSprints();
    }

    novo(): void {
        this.aoCriarSp.emit();
    }

    editar(sprint: Sprint): void {
        this.aoEditarSp.emit(sprint);
    }

}
