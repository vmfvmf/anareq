import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Fluxopassoesboco} from '../fluxopassoesboco';
    import {FluxopassoService} from '../fluxopasso.service';
    
@Component({
  selector: 'app-fluxopasso-esboco-novo',
  templateUrl: './fluxopasso-esboco-novo.component.html'
})
export class FluxopassoEsbocoNovoComponent implements OnInit {
private _fpesboco: Fluxopassoesboco;
@Input()
set fpesboco (obj: Fluxopassoesboco) {this._fpesboco = obj;}
get fpesboco () {return this._fpesboco;}
janela = "Novo Editar";
@Output() aoGravar = new EventEmitter<any>();
constructor(private fluxopassoService: FluxopassoService) { }

  ngOnInit() {
      this.fpesboco = { };
  }
  
  log(event: Event){
      this.fpesboco.imagem = (<FileList>(<HTMLInputElement>event.srcElement).files)[0];
  }
  
  gravar(): void {
      if (this.fpesboco.fluxopasso_id > 0) {
//            this.fluxopassoService.gravar(this.fpesboco)
//                .subscribe(_ => this.aoGravar.emit(_));
        }
        else this.fluxopassoService.novoEsboco(this.fpesboco)
            .subscribe((c: Fluxopassoesboco) => this.aoGravar.emit(c));
    }

}
