import {Component, OnInit, Input } from '@angular/core';
import {Projeto} from "../projeto";

@Component({
    selector: 'app-projeto-detalhes',
    templateUrl: './projeto-detalhes.component.html' 
})
export class ProjetoDetalhesComponent implements OnInit {

    private _projeto: Projeto;
    @Input() 
    set objeto(obj: Projeto) { this._projeto =  obj; }
    get objeto(){ return this._projeto; }
    
    constructor( ) {}
    ngOnInit() { }
}
