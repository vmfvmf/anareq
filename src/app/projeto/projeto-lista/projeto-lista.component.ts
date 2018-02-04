import { Component, OnInit } from '@angular/core';
import {Projeto} from '../projeto';
import {ProjetoService} from '../projeto.service';

@Component({
  selector: 'app-projeto-lista',
  templateUrl: './projeto-lista.component.html',
  styleUrls: ['./projeto-lista.component.css']
})
export class ProjetoListaComponent implements OnInit {

  constructor(private projetoService: ProjetoService) { }

  ngOnInit() {
        this.getProjetos();
    }
    projetos: Projeto[];
    
    getProjetos(): void {
        this.projetoService.todosProjetos()
            .subscribe(projetos => this.projetos = projetos);
    }
    
    delete(projeto: Projeto): void {
        this.projetos = this.projetos.filter(p => p !== projeto);
        this.projetoService.deletaProjeto(projeto).subscribe();
    }

}
