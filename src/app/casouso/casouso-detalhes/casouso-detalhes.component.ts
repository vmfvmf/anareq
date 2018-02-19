import {Component, OnInit} from '@angular/core';
import { FacadeService } from '../../facade.service';


@Component({
    selector: 'app-casouso-detalhes',
    templateUrl: './casouso-detalhes.component.html'
})
export class CasousoDetalhesComponent implements OnInit {
    get casouso(){ return this.facadeService.casouso; }
    
    constructor( private facadeService: FacadeService ) {}
    
    ngOnInit() {
        this.facadeService.carregaInfo();
    }

}
