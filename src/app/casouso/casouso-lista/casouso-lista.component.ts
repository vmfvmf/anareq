import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Casouso} from '../casouso';
import {CasousoService} from '../casouso.service';

@Component({
    selector: 'app-casouso-lista',
    templateUrl: './casouso-lista.component.html'
})
export class CasousoListaComponent implements OnInit {
    @Input() sprint_id: number;

    casousos: Casouso[];

    @Output() aoCriarUC = new EventEmitter<any>();
    @Output() aoEditarUC = new EventEmitter<Casouso>();

    constructor(private casousoService: CasousoService) {}

    ngOnInit() {
        this.getCasousos();
    }

    getCasousos(): void {
        this.casousoService.todos_do_sprint(this.sprint_id)
            .subscribe(casousos => this.casousos = casousos);
    }

    novo(): void {
        this.aoCriarUC.emit();
    }

    delete(caso: Casouso): void {
        this.casousoService.deleta(caso).subscribe();
        this.getCasousos();
    }

    editar(caso: Casouso): void {
        this.aoEditarUC.emit(caso);
    }



}
