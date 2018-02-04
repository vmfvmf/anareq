import { Component, OnInit, Input } from '@angular/core';
import {Casouso} from '../../casouso/casouso';
import {FluxoService} from '../fluxo.service';

@Component({
  selector: 'app-fluxo-novo',
  templateUrl: './fluxo-novo.component.html',
  styleUrls: ['./fluxo-novo.component.css']
})
export class FluxoNovoComponent implements OnInit {
    @Input() casouso: Casouso;
    
  constructor(private fluxoService: FluxoService) { }

  ngOnInit() {
  }
  
  gravar(sigla: string, titulo: string, descricao: string): void {
      let fluxo = {
          sigla: sigla, 
          titulo: titulo, 
          descricao: descricao, 
          casouso_id: this.casouso.id,
          //projeto_id: this.casouso.projeto_id, 
          sprint_id: this.casouso.sprint_id
          };
          
        this.fluxoService.novo(fluxo)
            .subscribe();
    }

}
