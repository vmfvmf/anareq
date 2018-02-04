import {Component, OnInit, Input} from '@angular/core';
import {Fluxo} from '../fluxo';
import {FluxoService} from '../fluxo.service';
import {ActivatedRoute} from '@angular/router';
import {Sprint} from "../../sprint/sprint";
import {Casouso} from "../../casouso/casouso";
import {CasousoService} from "../../casouso/casouso.service";
import {SprintService} from "../../sprint/sprint.service";
import {ProjetoService} from "../../projeto/projeto.service";
import {Projeto} from "../../projeto/projeto";
import {tap} from 'rxjs/operators'; // catchError, map, 

@Component({
    selector: 'app-fluxo-detalhes',
    templateUrl: './fluxo-detalhes.component.html',
    styleUrls: ['./fluxo-detalhes.component.css']
})
export class FluxoDetalhesComponent implements OnInit {
    @Input() fluxo: Fluxo;
    public projeto: Projeto;
    public sprint: Sprint;
    public casouso: Casouso;


    constructor(private route: ActivatedRoute,
        private sprintService: SprintService,
        private casousoService: CasousoService,
        private projetoService: ProjetoService,
        private fluxoService: FluxoService) {}

    ngOnInit() {
        this.getFluxo();
    }

    getFluxo(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.fluxoService.detalhes(id).pipe(
            tap((f: Fluxo) => this.getRelacionados(f))
        )
            .subscribe(f => this.fluxo = f);
    }

    getRelacionados(f: Fluxo) {
        this.casousoService.detalhes(f.casouso_id).subscribe(c => this.casouso = c);
        this.sprintService.detalhes(f.sprint_id).subscribe(s => this.sprint = s);
        //this.projetoService.detalhes(f.projeto_id).subscribe(p => this.projeto = p);
    }

}
