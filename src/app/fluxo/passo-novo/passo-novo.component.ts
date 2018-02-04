import { Component, OnInit, Input } from '@angular/core';
import {Fluxo} from '../fluxo';
import {PassoService} from '../passo.service';


@Component({
  selector: 'app-passo-novo',
  templateUrl: './passo-novo.component.html',
  styleUrls: ['./passo-novo.component.css']
})
export class PassoNovoComponent implements OnInit {
    @Input() fluxo: Fluxo;
    
  constructor(private passoService: PassoService) { }

  ngOnInit() {
  }
  
   gravar(descricao: string, numero: number): void {
      let passo = {
            descricao: descricao, 
            number: numero,
            fluxo_id: this.fluxo.id
          };
          
        this.passoService.novo(descricao, numero, this.fluxo.id)
            .subscribe();
    }

}
