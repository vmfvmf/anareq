import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Casouso} from "../../casouso/casouso";
import {CasousoListaComponent} from "../../casouso/casouso-lista/casouso-lista.component";
import {Sprint} from "../sprint";
import {SprintService} from "../sprint.service";
import {ProjetoService} from "../../projeto/projeto.service";
import {Projeto} from "../../projeto/projeto";
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-sprint-detalhes',
    templateUrl: './sprint-detalhes.component.html',
    styleUrls: ['./sprint-detalhes.component.css']
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

    @ViewChild(CasousoListaComponent) ucListaComponent: CasousoListaComponent;


    constructor(private route: ActivatedRoute,
        private sprintService: SprintService, private modalService: NgbModal,
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

    editar(c: Casouso, content: any) {
        this.casouso = c;
        this.open(content);
    }

    novo(content: any) {
        this.casouso = {sprint_id: this.sprint.id};
        this.open(content);
    }

    open(content: any) {
        this.modalService.open(content).result.then((result) => {
            if (result == `gravar`) {
                this.ucListaComponent.getCasousos();
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
