import {Component, OnInit, Input } from '@angular/core';
import {Projeto} from "../projeto";
import { FacadeService } from '../../facade.service';

@Component({
    selector: 'app-projeto-detalhes',
    templateUrl: './projeto-detalhes.component.html' 
})
export class ProjetoDetalhesComponent implements OnInit {

    get objeto(){ return this.facadeService.projeto; }
    
    constructor( private facadeService: FacadeService ) {}
    
    ngOnInit() {
        this.facadeService.carregaInfo();
    }
}
