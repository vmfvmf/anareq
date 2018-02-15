import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {RnService} from '../rn.service';
import {Rn} from '../rn';
import {Fluxopasso} from '../../fluxo/fluxopasso';

@Component({
  selector: 'app-rn-lista',
  templateUrl: './rn-lista.component.html'
})
export class RnListaComponent implements OnInit {

   constructor(private rnService: RnService) {}

    rns: Rn[];
    rn: Rn;

    private _fluxopasso: Fluxopasso;
    @Input()
    set objeto(obj: Fluxopasso) {this._fluxopasso = obj; this.getRns();}
    get objeto() {return this._fluxopasso;}
    
    @Output() abreJanela = new EventEmitter<any>();

    ngOnInit() { }
    
    getRns(): void {
        this.rnService.todos_do_passo(this.objeto.id)
            .subscribe(obj => this.rns = obj);
    }

}
