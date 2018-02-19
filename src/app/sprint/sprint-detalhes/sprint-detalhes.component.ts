import { Component, OnInit } from '@angular/core';
import { Sprint } from "../sprint";
import { FacadeService } from '../../facade.service';

@Component({
    selector: 'app-sprint-detalhes',
    templateUrl: './sprint-detalhes.component.html'
})
export class SprintDetalhesComponent implements OnInit {

    get objeto() { return this.facadeService.sprint; }

    constructor(private facadeService: FacadeService) { }

    ngOnInit() {
        this.facadeService.carregaInfo();
    }

}
