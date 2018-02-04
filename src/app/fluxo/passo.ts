import {Fluxo} from './fluxo';
import {FluxoService} from './fluxo.service';

export class Passo {
  id?: number;
  descricao: string;
  fluxo_id: number;
  fluxo?: Fluxo;
  
  constructor(private fluxoService: FluxoService) { }
  
  getFluxoParent(){
      this.fluxoService.detalhes(this.fluxo_id).subscribe(f => this.fluxo = f);
  }
}


