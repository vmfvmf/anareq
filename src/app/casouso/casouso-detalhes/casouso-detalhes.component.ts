import {Component, OnInit, Input} from '@angular/core';
import {Sprint} from "../../sprint/sprint";
import {Casouso} from "../casouso";
import {CasousoService} from "../casouso.service";
import {SprintService} from "../../sprint/sprint.service";
import {ProjetoService} from "../../projeto/projeto.service";
import {Projeto} from "../../projeto/projeto";
import {ActivatedRoute} from '@angular/router';
//import {Observable} from 'rxjs/observable';
import {tap} from 'rxjs/operators'; // catchError, map, 



@Component({
    selector: 'app-casouso-detalhes',
    templateUrl: './casouso-detalhes.component.html'
})
export class CasousoDetalhesComponent implements OnInit {

    @Input() casouso: Casouso;
    public projeto: Projeto;
    public sprint: Sprint;

    constructor(private route: ActivatedRoute,
        private sprintService: SprintService,
        private casousoService: CasousoService,
        private projetoService: ProjetoService) {}

    ngOnInit() {
        this.getCasouso();
    }

    getCasouso(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.casousoService.detalhes(id).pipe(
                tap((c: Casouso) => this.getProjetoSprint(c))
            )
            .subscribe(c => this.casouso = c);
    }
    
    getProjetoSprint(c:Casouso){
        this.sprintService.detalhes(c.sprint_id).subscribe(s => {
            this.sprint = s;
            this.projetoService.detalhes(s.projeto_id).subscribe(p => this.projeto = p);
        });
        
    }

}
