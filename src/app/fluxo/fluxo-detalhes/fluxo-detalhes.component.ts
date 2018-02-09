import {Component, OnInit, Input} from '@angular/core';
import {Sprint} from "../../sprint/sprint";
import {Casouso} from "../../casouso/casouso";
import {Fluxo} from "../fluxo";
import {FluxoService} from "../fluxo.service";
import {SprintService} from "../../sprint/sprint.service";
import {ProjetoService} from "../../projeto/projeto.service";
import {CasousoService} from "../../casouso/casouso.service";
import {Projeto} from "../../projeto/projeto";
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators'; // catchError, map, 


@Component({
    selector: 'app-fluxo-detalhes',
    templateUrl: './fluxo-detalhes.component.html'
})
export class FluxoDetalhesComponent implements OnInit {

    //@Input() 
    public fluxo: Fluxo;
    public projeto: Projeto;
    public sprint: Sprint;
    public casouso: Casouso;

    constructor(private route: ActivatedRoute,
        private sprintService: SprintService,
        private fluxoService: FluxoService,
        private casousoService: CasousoService,
        private projetoService: ProjetoService) {}

    ngOnInit() {
        this.getFluxo();
    }

    getFluxo(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.fluxoService.detalhes(id).pipe(
            tap((obj: Fluxo) => this.getProjetoSprint(obj))
            )
            .subscribe(obj => this.fluxo = obj);
    }
    
    getProjetoSprint(obj:Fluxo){
        this.fluxo = obj;
        
        this.casousoService.detalhes(obj.casouso_id).subscribe( caso =>{
            this.casouso = caso;
            this.sprintService.detalhes(caso.sprint_id).subscribe(s => {
                this.sprint = s;
                this.projetoService.detalhes(s.projeto_id)
                    .subscribe(p => this.projeto = p);
        });});
    }

}
