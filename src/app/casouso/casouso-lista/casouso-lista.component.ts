import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Casouso} from '../casouso';
import {Sprint} from '../../sprint/sprint';
import {CasousoService} from '../casouso.service';

@Component({
    selector: 'app-casouso-lista',
    templateUrl: './casouso-lista.component.html'
})
export class CasousoListaComponent implements OnInit {
   private _sprint: Sprint;
    @Input() 
    set sprint(obj: Sprint) {this._sprint = obj; this.getCasousos();}
    get sprint() {return this._sprint;}
    
    @Output() abreJanela = new EventEmitter<any>();
    
    casousos: Casouso[];
    casouso: Casouso;

    constructor(private casousoService: CasousoService) {}

    ngOnInit() {  }

    getCasousos(): void {
        this.casousoService.todos_do_sprint(this.sprint.id)
            .subscribe(casousos => this.casousos = casousos);
    }
}
