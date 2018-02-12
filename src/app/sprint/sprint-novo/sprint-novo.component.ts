import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SprintService} from '../sprint.service';
import {Sprint} from '../sprint';
import {EuFormulario} from '../../Interfaces/MinhasInterfaces';

@Component({
    selector: 'app-sprint-novo',
    templateUrl: './sprint-novo.component.html'
})
export class SprintNovoComponent implements OnInit, EuFormulario {
    private _s: Sprint;
    @Input()
    set objeto(s: Sprint) {
        this._s = s;
        if (this._s.id > 0) this.titulo = 'Editar';

    }
    get objeto() {
        return this._s;
    }

    private titulo: string = 'Novo';

    @Output() aoGravar = new EventEmitter<any>();

    constructor( private sprintService: SprintService) {}

    ngOnInit() { }

    gravar(): void {
        if (this.objeto.id > 0) {
            this.sprintService.gravar(this.objeto)
            .subscribe( obj => this.aoGravar.emit( obj ));
        }
        else this.sprintService.novo(this.objeto)
            .subscribe((obj: Sprint) => this.aoGravar.emit(obj));
    }
}
