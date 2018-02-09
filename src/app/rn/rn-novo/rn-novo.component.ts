import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Rn} from '../rn';
import {RnService} from '../rn.service';

@Component({
    selector: 'app-rn-novo',
    templateUrl: './rn-novo.component.html'
})
export class RnNovoComponent implements OnInit {
    private _rn: Rn;
    @Input()
    set rn(obj: Rn) {
        this.janela = (obj.id > 0) ? 'Editar' : 'Novo';
        this._rn = obj;

    }
    get rn() {
        return this._rn;
    }

    private janela: string = 'Novo';

    @Output() aoGravar = new EventEmitter<any>();

    constructor(private rnService: RnService) { }

    ngOnInit() {  }

    gravar(): void {
        if (this.rn.id > 0) {
            this.rnService.gravar(this.rn)
                .subscribe(_ => this.aoGravar.emit(_));
        }
        else {
            this.rnService.novo(this.rn)
             .subscribe((obj: Rn) => this.aoGravar.emit(obj)); 
        }
    }

}
