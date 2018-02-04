import {Component, Input, OnInit} from '@angular/core';
import {Passo} from '../passo';
import {Fluxo} from '../../fluxo/fluxo';
import {PassoService} from '../passo.service';
import {ActivatedRoute} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-passo-lista',
    templateUrl: './passo-lista.component.html',
    styleUrls: ['./passo-lista.component.css']
})
export class PassoListaComponent implements OnInit {
    @Input() fluxo: Fluxo;
    public passos: Passo[];
    closeResult: string;

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

    open(content: any) {
        this.modalService.open(content).result.then((result) => {
            if(result == `gravar`) alert('gravar');
        }, (reason) => {
            //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        //$route.reload();
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
