import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Projeto} from '../projeto';
import {ProjetoService} from '../projeto.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-projeto-lista',
    templateUrl: './projeto-lista.component.html'
})
export class ProjetoListaComponent implements OnInit {

    constructor(private projetoService: ProjetoService, private modalService: NgbModal) {}

    projetos: Projeto[];
    projeto: Projeto;

    @Output() aoCriarPrj = new EventEmitter<any>();
    
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
           switch (result) {
                case 'gravar': this.getProjetos(); break;
                default: break;
            }
        }, (reason) => {
            this.getProjetos();
            //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        //$route.reload();
    }



}
