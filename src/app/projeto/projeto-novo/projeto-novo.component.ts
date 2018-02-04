import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ProjetoService} from '../projeto.service';
import {Projeto} from '../projeto';

@Component({
    selector: 'app-projeto-novo',
    templateUrl: './projeto-novo.component.html'
})
export class ProjetoNovoComponent implements OnInit {
    private _projeto: Projeto;
    @Input()
    set projeto(c: Projeto) {
        this.janela = (c.id > 0) ? 'Editar' : 'Novo';
        this._projeto = c;

    }
    get projeto() {
        return this._projeto;
    }

    private janela: string = 'Novo';

    @Output() aoGravar = new EventEmitter<any>();

    constructor(
        private projetoService: ProjetoService) {}


    ngOnInit() {
    }

    gravar(): void {
        if (this.projeto.id > 0) {
            this.projetoService.gravar(this.projeto);
            this.atualiza(this.projeto);
        }
        else this.projetoService.novo(this.projeto)
            .subscribe((p: Projeto) => this.atualiza(p));
    }

    atualiza(p: Projeto) {
        this.aoGravar.emit(p);
        this.projeto = p;
    }

}
