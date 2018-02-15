import {Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {Fluxopasso} from '../fluxopasso';
import {Fluxo} from '../../fluxo/fluxo';
import {FluxopassoService} from '../fluxopasso.service';

@Component({
    selector: 'app-fluxopasso-lista',
    templateUrl: './fluxopasso-lista.component.html'
})

export class FluxopassoListaComponent implements OnInit {
    private _fluxo: Fluxo;
    @Input()
    set fluxo(obj: Fluxo) {this._fluxo = obj; this.getPassos(); console.log(obj);}
    get fluxo() {return this._fluxo;}

    public fluxopassos: Fluxopasso[];

    constructor(private fluxopassoService: FluxopassoService) {}

    ngOnInit() {
        this.getPassos();
    }
    
    @Output() abreJanela = new EventEmitter<any>();

    getPassos(): void {
        this.fluxopassoService.todos_do_fluxo(this.fluxo.id)
            .subscribe(obj => this.fluxopassos = obj);
    }
}
