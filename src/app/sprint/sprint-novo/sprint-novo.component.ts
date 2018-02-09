import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SprintService} from '../sprint.service';
import {Sprint} from '../sprint';

@Component({
    selector: 'app-sprint-novo',
    templateUrl: './sprint-novo.component.html'
})
export class SprintNovoComponent implements OnInit {
    private _s: Sprint;
    @Input()
    set sprint(s: Sprint) {
        this._s = s;
        if (this._s.id > 0) this.titulo = 'Editar';

    }
    get sprint() {
        return this._s;
    }

    private titulo: string = 'Novo';

    @Output() aoGravar = new EventEmitter<any>();

    constructor( private sprintService: SprintService) {}

    ngOnInit() { }

    gravar(): void {
        if (this.sprint.id > 0) {
            this.sprintService.gravar(this.sprint)
            .subscribe( _ => this.aoGravar.emit(null));
        }
        else this.sprintService.novo(this.sprint)
            .subscribe( _ => this.aoGravar.emit(null));
    }
}
