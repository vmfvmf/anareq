import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {PassoService} from '../passo.service';
import {Passo} from '../passo';

@Component({
    selector: 'app-passo-novo',
    templateUrl: './passo-novo.component.html'
})
export class PassoNovoComponent implements OnInit {
    private _c: Passo;
    
    @Input()
    set passo(c: Passo) {
        this.janela = (c.id > 0) ? 'Editar' : 'Novo';
        this._c = c;

    }
    get passo() {
        return this._c;
    }

    private janela: string = 'Novo';

    @Output() aoGravar = new EventEmitter<any>();

    constructor(private passoService: PassoService) {}

    ngOnInit() {
    }

    gravar(): void {
        if (this.passo.id > 0) {
            this.passoService.gravar(this.passo)
                .subscribe(_ => this.aoGravar.emit(_));
        }
        else this.passoService.novo(this.passo)
            .subscribe((c: Passo) => this.aoGravar.emit(c));
    }


}
