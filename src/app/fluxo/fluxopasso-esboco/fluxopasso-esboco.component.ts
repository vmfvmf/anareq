import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FluxopassoService} from '../fluxopasso.service';
import {Fluxopasso} from '../fluxopasso';
import { Fluxopassoesboco } from '../fluxopassoesboco';

@Component({
  selector: 'app-fluxopasso-esboco',
  templateUrl: './fluxopasso-esboco.component.html'
})
export class FluxopassoEsbocoComponent implements OnInit {
 
    esboco: Fluxopassoesboco;
    
    @Input() set fluxopasso(obj: Fluxopasso){
      if (obj){
        this._fluxopasso = obj;
        //console.log(this._fluxopasso.id);
        this.getEsboco(this._fluxopasso.id);
      } 

    }
    get fluxopasso(){ return this._fluxopasso; }

    private _fluxopasso: Fluxopasso;
   
    
    @Output() abreJanela = new EventEmitter<any>();
    
    //casousos: Casouso[];
    //casouso: Casouso;

    constructor(private fluxopassoService: FluxopassoService) {}

    ngOnInit() {  }

    getEsboco(id: number) {
      this.fluxopassoService.getEsboco(id).subscribe(
        (obj) =>{
          this.esboco = obj;
        } 
      );
    }
    deletaEsboco(){
      let imgurl = this.esboco.imgurl;
      this.fluxopassoService.deletaEsboco(this.esboco).subscribe();
    }
}
