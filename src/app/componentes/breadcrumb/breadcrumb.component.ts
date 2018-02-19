import {Component,  OnInit } from '@angular/core';

import { FluxopassoEsbocoNovoComponent } from '../../fluxo/fluxopasso-esboco-novo/fluxopasso-esboco-novo.component'
import { FacadeService } from '../../facade.service';
import { Projeto } from '../../projeto/projeto';
@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {

    get projeto(){ return this.facadeService.projeto; }
    get sprint(){ return this.facadeService.sprint; }
    get casouso(){ return this.facadeService.casouso; }
    get fluxo(){ return this.facadeService.fluxo; }
    get fluxopasso(){ return this.facadeService.fluxopasso; }
    get rn(){ return this.facadeService.rn; }
    get paginaAtual(){ return this.facadeService.paginaAtual; }
    constructor(private facadeService: FacadeService) {}

    ngOnInit() {
       
    }


  
    




}
