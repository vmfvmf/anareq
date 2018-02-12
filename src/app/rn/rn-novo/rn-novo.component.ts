import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Rn} from '../rn';
import {RnService} from '../rn.service';
import {EuFormulario} from '../../Interfaces/MinhasInterfaces';

@Component({
    selector: 'app-rn-novo',
    templateUrl: './rn-novo.component.html'
})
export class RnNovoComponent implements OnInit, EuFormulario {
    private _rn: Rn;
    @Input()
    set objeto(obj: Rn) {
        this.janela = (obj && obj.id) ? 'Editar' : 'Nova';
        this._rn = obj;
    }
    get objeto() { return this._rn; }
    private janela = '';
    @Output() aoGravar = new EventEmitter<any>();

    constructor(private rnService: RnService) { }

    ngOnInit() { }

    gravar(): void {
        if (this.objeto.id > 0) {
            this.rnService.gravar(this.objeto)
                .subscribe(_ => this.aoGravar.emit(_));
        }
        else if (this.objeto.casouso_id) {
            this.rnService.novo(this.objeto)
             .subscribe((obj: Rn) => this.aoGravar.emit(obj)); 
        }
    }

}
