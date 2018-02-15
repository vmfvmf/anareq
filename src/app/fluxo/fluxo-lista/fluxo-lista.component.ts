import {Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {Fluxo} from '../fluxo';
import {FluxoService} from '../fluxo.service';
import {Casouso} from '../../casouso/casouso';

@Component({
    selector: 'app-fluxo-lista',
    templateUrl: './fluxo-lista.component.html'
})
export class FluxoListaComponent implements OnInit {
    private _casouso: Casouso;
    @Input()
    set casouso(obj: Casouso) {this._casouso = obj; this.getFluxos(); }
    get casouso() {return this._casouso;}
    
    @Output() abreJanela = new EventEmitter<any>();

    fluxos: Fluxo[];
    fluxo: Fluxo;

    constructor(private fluxoService: FluxoService) { }

    ngOnInit() { }

    getFluxos(): void {
        this.fluxoService.todos_do_casouso(this.casouso.id)
            .subscribe(fluxos => this.fluxos = fluxos);
    }
    
}
