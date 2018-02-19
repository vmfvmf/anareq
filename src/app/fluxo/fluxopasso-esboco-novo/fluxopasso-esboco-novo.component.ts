import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Fluxopassoesboco} from '../fluxopassoesboco';
    import {FluxopassoService} from '../fluxopasso.service';
import { TestBed } from '@angular/core/testing';
import { IAlertMsg } from '../../iAlertMsg';
    
@Component({
  selector: 'app-fluxopasso-esboco-novo',
  templateUrl: './fluxopasso-esboco-novo.component.html'
})
export class FluxopassoEsbocoNovoComponent implements OnInit {
private _fpesboco: Fluxopassoesboco;
private img: File;
@Input()
set objeto (obj: Fluxopassoesboco) {this._fpesboco = obj;}
get objeto () {return this._fpesboco;}
janela = "Novo Editar";
@Output() aoGravar = new EventEmitter<any>();
constructor(private fluxopassoService: FluxopassoService) { }

  ngOnInit() { }
  
  log(event: Event){
      this.img = (<FileList>(<HTMLInputElement>event.srcElement).files)[0];
  }
    gravar(): void {
        this.fluxopassoService.carregarArquivo(this.img).subscribe(
           (imsg: IAlertMsg) => {
               console.log('imsg');
               this.objeto.imgurl = imsg.data;
               console.log(imsg);
                this.fluxopassoService.novoEsboco(this.objeto)
                .subscribe((obj: Fluxopassoesboco) => this.aoGravar.emit(obj));
           } 
        );
    }

}
