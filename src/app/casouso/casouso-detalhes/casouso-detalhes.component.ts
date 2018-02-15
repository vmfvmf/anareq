import {Component, OnInit, Input} from '@angular/core';
import {Sprint} from "../../sprint/sprint";
import {Casouso} from "../casouso";


@Component({
    selector: 'app-casouso-detalhes',
    templateUrl: './casouso-detalhes.component.html'
})
export class CasousoDetalhesComponent implements OnInit {
    private _casouso: Casouso;
    @Input() 
    set objeto(obj: Casouso) { this._casouso = obj; }
    get objeto() { return this._casouso; }
    
    public sprint: Sprint;

    constructor() {}

    ngOnInit() {  }

}
