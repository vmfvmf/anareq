import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Projeto} from '../projeto';
import {ProjetoService} from '../projeto.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-projeto-lista',
    templateUrl: './projeto-lista.component.html'
})
export class ProjetoListaComponent implements OnInit {

    constructor(private projetoService: ProjetoService, private modalService: NgbModal,) {}

    projetos: Projeto[];
    projeto: Projeto;

    @Output() aoCriarPrj = new EventEmitter<any>();
    @Output() aoEditarPrj = new EventEmitter<Projeto>();
    
    ngOnInit() {
        this.getProjetos();
    }
    

    getProjetos(): void {
        this.projetoService.todos()
            .subscribe(projetos => this.projetos = projetos);
    }

    novo(content: any) {
        this.projeto = {};
        this.open(content);
    }

    delete(obj: Projeto): void {
        this.projetoService.deleta(obj).subscribe();
        this.getProjetos();
    }

    editar(obj: Projeto, content: any): void {
        this.projeto = obj;
        this.open(content);
    }
    
     open(content: any) {
        this.modalService.open(content).result.then((result) => {
            if (result == `gravar`) {
                this.getProjetos();
            }
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
