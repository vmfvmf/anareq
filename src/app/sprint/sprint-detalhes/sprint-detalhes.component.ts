import {Component, OnInit, Input } from '@angular/core';
import {Sprint} from "../sprint";

@Component({
    selector: 'app-sprint-detalhes',
    templateUrl: './sprint-detalhes.component.html'
})
export class SprintDetalhesComponent implements OnInit {
 
    private _sprint: Sprint;
    @Input()
    set objeto(p: Sprint) {  this._sprint = p;  }
    get objeto() {  return this._sprint; }
    constructor() {}

    ngOnInit() { }

}
