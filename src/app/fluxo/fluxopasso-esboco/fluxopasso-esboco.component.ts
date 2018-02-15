import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FluxopassoService} from '../fluxopasso.service';

@Component({
  selector: 'app-fluxopasso-esboco',
  templateUrl: './fluxopasso-esboco.component.html'
})
export class FluxopassoEsbocoComponent implements OnInit {
    esboco = false;
   //private _sprint: Sprint;
    @Input() 
    //set sprint(obj: Sprint) {this._sprint = obj; this.getCasousos();}
    //get sprint() {return this._sprint;}
    
    @Output() abreJanela = new EventEmitter<any>();
    
    //casousos: Casouso[];
    //casouso: Casouso;

    constructor(private fluxopassoService: FluxopassoService) {}

    ngOnInit() {  }

    getCasousos(): void {
      //  this.fluxopassoService.todos_do_sprint(this.sprint.id)
      //      .subscribe(casousos => this.casousos = casousos);
    }
    
    novaJanela(){
        this.abreJanela.emit("CasousoNovoComponent");
    }

}
