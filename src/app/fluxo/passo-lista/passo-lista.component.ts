import {Component, Input, OnInit} from '@angular/core';
import {Passo} from '../passo';
import {Fluxo} from '../../fluxo/fluxo';
import {Rn} from '../../rn/rn';
import {PassoService} from '../passo.service';
import {ActivatedRoute} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-passo-lista',
    templateUrl: './passo-lista.component.html'
})

export class PassoListaComponent implements OnInit {
    public rn: Rn;
    //@Input() fluxo: Fluxo;
    public passos: Passo[];

    constructor(private passoService: PassoService,
        private route: ActivatedRoute, private modalService: NgbModal) {}

    ngOnInit() {
        this.getPassos();
    }

    getPassos(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.passoService.todos_do_fluxo(id)
            .subscribe(ps => this.passos = ps);
    }
    
    novaRn(content: any){
        this.rn = { casouso_id: 3 };
        this.open(content);
    }

    open(content: any) {
        this.modalService.open(content).result.then((result) => {
            switch (result) {
                case 'gravar': this.getPassos(); break;
                default: break;
            }
        }, (reason) => {
            this.getPassos();
        });
    }

}
