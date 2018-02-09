import {Component, OnInit, Input } from '@angular/core';
import {Projeto} from "../projeto";
import {ProjetoService} from "../projeto.service";
import {SprintListaComponent} from "../../sprint/sprint-lista/sprint-lista.component";
import {Sprint} from "../../sprint/sprint";
import {SprintNovoComponent} from "../../sprint/sprint-novo/sprint-novo.component";
import {ActivatedRoute} from '@angular/router';
//import {Location} from '@angular/common';

@Component({
    selector: 'app-projeto-detalhes',
    templateUrl: './projeto-detalhes.component.html' 
})
export class ProjetoDetalhesComponent implements OnInit {

    private _projeto: Projeto;
    @Input() 
    set projeto(p: Projeto){
        this._projeto = p;
    }
    get projeto(){
        return this._projeto;
    }
    
    
    constructor(private route: ActivatedRoute, private projetoService: ProjetoService
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
    
     
}
