import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FluxopassoService} from '../fluxopasso.service';
import {Fluxopasso} from '../fluxopasso';
import {EuFormulario} from '../../Interfaces/MinhasInterfaces';

@Component({
    selector: 'app-fluxopasso-novo',
    templateUrl: './fluxopasso-novo.component.html'
})
export class FluxopassoNovoComponent implements OnInit, EuFormulario {
    private _fluxopasso: Fluxopasso;
    
    @Input()
    set objeto(obj: Fluxopasso) { this.janela = (obj.id > 0) ? 'Editar' : 'Novo';  this._fluxopasso = obj;  }
    get objeto() {  return this._fluxopasso;  }

    private janela: string = 'Novo';

    @Output() aoGravar = new EventEmitter<any>();

    constructor(private fluxopassoService: FluxopassoService) {}

    ngOnInit() {
    }

    gravar(): void {
        if (this.objeto.id > 0) {
            this.fluxopassoService.gravar(this.objeto)
                .subscribe(_ => this.aoGravar.emit(_));
        }
        else this.fluxopassoService.novo(this.objeto)
            .subscribe((c: Fluxopasso) => this.aoGravar.emit(c));
    }


}
