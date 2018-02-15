import { Component, OnInit, Input } from '@angular/core';
import {Fluxopasso} from '../fluxopasso';

@Component({
  selector: 'app-fluxopasso-detalhes',
  templateUrl: './fluxopasso-detalhes.component.html'
})
export class FluxopassoDetalhesComponent implements OnInit {
    private _fluxopasso: Fluxopasso;
    @Input()
    set objeto(obj: Fluxopasso) {this._fluxopasso = obj;}
    get objeto() {return this._fluxopasso;}


  constructor() { }

  ngOnInit() {
  }

}
