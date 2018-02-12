import { Component, OnInit, Input } from '@angular/core';
import {RnService} from '../rn.service';
import {Rn} from '../rn';
import {Passo} from '../../fluxo/passo';

@Component({
  selector: 'app-rn-lista',
  templateUrl: './rn-lista.component.html'
})
export class RnListaComponent implements OnInit {

   constructor(private rnService: RnService) {}

    rns: Rn[];
    rn: Rn;

    @Input() 
    passo: Passo;
    //@Output() aoCriarPrj = new EventEmitter<any>();
    
    ngOnInit() {
        this.getRns();
    }
    

    getRns(): void {
        this.rnService.todos_do_passo(this.passo.id)
            .subscribe(obj => this.rns = obj);
    }

}
