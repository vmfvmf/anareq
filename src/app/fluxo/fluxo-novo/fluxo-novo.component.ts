import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FluxoService} from '../fluxo.service';
import {Fluxo} from '../fluxo';
import {EuFormulario} from '../../Interfaces/MinhasInterfaces';

@Component({
    selector: 'app-fluxo-novo',
    templateUrl: './fluxo-novo.component.html'
})
export class FluxoNovoComponent implements OnInit, EuFormulario {
    private _c: Fluxo;
    @Input()
    set objeto(c: Fluxo) {this.janela = (c.id > 0) ? 'Editar' : 'Novo'; this._c = c; }
    get objeto() { return this._c; }

    private janela: string = 'Novo';

    @Output() aoGravar = new EventEmitter<any>();

    constructor(private fluxoService: FluxoService) {}

    ngOnInit() {
    }

    gravar(): void {
        if (this.objeto.id > 0) {
            this.fluxoService.gravar(this.objeto)
                .subscribe();
        }
        else this.fluxoService.novo(this.objeto)
            .subscribe();
    }
    
}
