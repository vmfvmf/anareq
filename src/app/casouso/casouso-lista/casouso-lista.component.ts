import {Component, OnInit} from '@angular/core';
import { FacadeService } from '../../facade.service';

@Component({
    selector: 'app-casouso-lista',
    templateUrl: './casouso-lista.component.html'
})
export class CasousoListaComponent implements OnInit {

    get sprint() {return this.facadeService.sprint;}
    get casousos() { return this.sprint.casousos; }
 
    constructor(private facadeService: FacadeService) {}

    ngOnInit() {  
        this.facadeService.casousoService.todos_do_sprint(this.sprint.id)
        .subscribe(casousos => this.facadeService.sprint.casousos = casousos);
    }

}