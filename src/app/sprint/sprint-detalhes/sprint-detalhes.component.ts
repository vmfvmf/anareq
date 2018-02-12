import {Component, OnInit, Input } from '@angular/core';
import {Sprint} from "../sprint";
import {SprintService} from "../sprint.service";
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';


@Component({
    selector: 'app-sprint-detalhes',
    templateUrl: './sprint-detalhes.component.html'
})
export class SprintDetalhesComponent implements OnInit {

    private _sprint: Sprint;
    @Input()
    set objeto(p: Sprint) {
        this._sprint = p;
    }
    get objeto() {
        return this._sprint;
    }
    constructor(private route: ActivatedRoute,
        private sprintService: SprintService) {}

    ngOnInit() { }

    getSprint(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.sprintService.detalhes(id)
            .subscribe(s => this.objeto = s);
    }

}
