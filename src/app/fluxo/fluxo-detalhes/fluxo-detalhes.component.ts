import {Component, OnInit, Input} from '@angular/core';
import {Fluxo} from "../fluxo";
import {FluxoService} from "../fluxo.service";
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-fluxo-detalhes',
    templateUrl: './fluxo-detalhes.component.html'
})
export class FluxoDetalhesComponent implements OnInit {

    //@Input() 
    public fluxo: Fluxo;

    constructor(private route: ActivatedRoute,
        private fluxoService: FluxoService) {}

    ngOnInit() {
        this.getFluxo(); 
    }

    getFluxo(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.fluxoService.detalhes(id)
        .subscribe(obj => this.fluxo = obj);
    }
    

}
