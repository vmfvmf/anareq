import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Projeto} from "../projeto";
import {ProjetoService} from "../projeto.service";
import {SprintListaComponent} from "../../sprint/sprint-lista/sprint-lista.component";
import {Sprint} from "../../sprint/sprint";
import {SprintNovoComponent} from "../../sprint/sprint-novo/sprint-novo.component";
import {ActivatedRoute} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
//import {Location} from '@angular/common';

@Component({
    selector: 'app-projeto-detalhes',
    templateUrl: './projeto-detalhes.component.html',
    styleUrls: ['./projeto-detalhes.component.css']
})
export class ProjetoDetalhesComponent implements OnInit {

    private _projeto: Projeto;
    @Input() 
    set projeto(p: Projeto){
        this._projeto = p;
        this.sprint = {projeto_id: p.id};
    }
    get projeto(){
        return this._projeto;
    }
    
    public sprint: Sprint;
    
    @ViewChild(SprintListaComponent) spListaComponent:SprintListaComponent;
    @ViewChild(SprintNovoComponent) spNovoComponent:SprintNovoComponent;

    constructor(private route: ActivatedRoute, private modalService: NgbModal,
        private projetoService: ProjetoService
        //private location: Location
        ) {}

    ngOnInit() {
        this.getProjeto();
    }
    
    getProjeto(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.projetoService.detalhes(id)
            .subscribe(p => this.projeto = p);
    }
    
      editar(s:Sprint, content: any) {
          this.sprint = s;
          this.open(content);
      }
      
      criar(content: any) {
          this.sprint = {projeto_id: this.projeto.id};
          this.open(content);
      }
      
      open(content: any) {
        this.modalService.open(content).result.then((result) => {
            if (result == `gravar`){
                this.spListaComponent.getSprints();
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
