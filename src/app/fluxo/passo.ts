import {Fluxo} from './fluxo';
import {FluxoService} from './fluxo.service';
import {Rn} from '../rn/rn';
import {RnService} from '../rn/rn.service';

export class Passo {
  id?: number;
  descricao: string;
  fluxo_id: number;
  fluxo?: Fluxo;
  
  constructor(private fluxoService: FluxoService, private rnService: RnService) { }
  
  getFluxoParent(){
      this.fluxoService.detalhes(this.fluxo_id).subscribe(f => this.fluxo = f);
  }
  
  public getRns(): Rn[]{
      //this.rnService.todos_do_passo(this.id).subscribe(f => return f);
      return null;
  }
}


