import {Component, OnInit } from '@angular/core';
import { FacadeService } from '../../facade.service';

@Component({
    selector: 'app-fluxo-lista',
    templateUrl: './fluxo-lista.component.html'
})
export class FluxoListaComponent implements OnInit {

    get casouso() {return this.facadeService.casouso;}
    get fluxos() {return this.facadeService.casouso.fluxos;}
    

    constructor(private facadeService: FacadeService) { }

    ngOnInit() { 
        console.log(this.facadeService.casouso);
        this.facadeService.fluxoService.todos_do_casouso(this.casouso.id)
            .subscribe(fluxos => {
                this.facadeService.casouso.fluxos = fluxos;
            });
    }

    
}
