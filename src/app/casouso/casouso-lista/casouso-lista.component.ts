import {Component, Input, OnInit} from '@angular/core';
import {Casouso} from '../casouso';
import {CasousoService} from '../casouso.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-casouso-lista',
    templateUrl: './casouso-lista.component.html'
})
export class CasousoListaComponent implements OnInit {
    @Input() sprint_id: number;

    casousos: Casouso[];
    casouso: Casouso;

    constructor(private casousoService: CasousoService, private modalService: NgbModal) {}

    ngOnInit() {
        this.getCasousos();
    }

    getCasousos(): void {
        this.casousoService.todos_do_sprint(this.sprint_id)
            .subscribe(casousos => this.casousos = casousos);
    }


    delete(casouso: Casouso): void {
        this.casousoService.deleta(casouso).subscribe();
        this.getCasousos();
    }

    editar(content: any, obj: Casouso) {
        this.casouso = obj;
        this.open(content);
    }

    novo(content: any) {
        this.casouso = {sprint_id: this.sprint_id};
        this.open(content);
    }

    open(content: any) {
        this.modalService.open(content).result.then((result) => {
            switch (result) {
                case 'gravar': this.getCasousos(); break;
                default: break;
            }
        }, (reason) => {
            this.getCasousos();
        });
    }


}
