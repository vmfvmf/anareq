import {Component, Input, OnInit} from '@angular/core';
import {Fluxo} from '../fluxo';
import {FluxoService} from '../fluxo.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-fluxo-lista',
  templateUrl: './fluxo-lista.component.html',
  styleUrls: ['./fluxo-lista.component.css']
})
export class FluxoListaComponent implements OnInit {
 //@Input() projeto_id: number;
    @Input() casouso_id: number;
    fluxos: Fluxo[];
    constructor(private fluxoService: FluxoService) {}

    ngOnInit() {
        this.getFluxos();
    }
    
    getFluxos(): void {
        this.fluxoService.todos_do_casouso(this.casouso_id)
            .subscribe(f => this.fluxos = f);
    }

}
