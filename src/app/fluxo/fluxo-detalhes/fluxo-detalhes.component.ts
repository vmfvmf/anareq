import {Component, OnInit, Input} from '@angular/core';
import {Fluxo} from "../fluxo";

@Component({
    selector: 'app-fluxo-detalhes',
    templateUrl: './fluxo-detalhes.component.html'
})
export class FluxoDetalhesComponent implements OnInit {
    private _fluxo: Fluxo;
    @Input()
    set objeto(obj: Fluxo) {this._fluxo = obj; }
    get objeto() {return this._fluxo;}

    constructor() {}

    ngOnInit() {   }
}
