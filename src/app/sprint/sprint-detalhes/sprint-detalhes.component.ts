import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Casouso} from "../../casouso/casouso";
import {Sprint} from "../sprint";
import {SprintService} from "../sprint.service";
import {ProjetoService} from "../../projeto/projeto.service";
import {Projeto} from "../../projeto/projeto";
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';


@Component({
    selector: 'app-sprint-detalhes',
    templateUrl: './sprint-detalhes.component.html'
})
export class SprintDetalhesComponent implements OnInit {

    private _sprint: Sprint;
    @Input()
    set sprint(p: Sprint) {
        this._sprint = p;
        this.casouso = {sprint_id: p.id};
    }
    get sprint() {
        return this._sprint;
    }

    public projeto: Projeto;
    public casouso: Casouso;


    constructor(private route: ActivatedRoute,
        private sprintService: SprintService, 
        private projetoService: ProjetoService) {}

    ngOnInit() {
        this.getSprint();
    }

    getSprint(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.sprintService.detalhes(id).pipe(
            tap((s: Sprint) =>
                this.projetoService.detalhes(s.projeto_id).subscribe(p => this.projeto = p)))
            .subscribe(s => this.sprint = s);
    }

}
