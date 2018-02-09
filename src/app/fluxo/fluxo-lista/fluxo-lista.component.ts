import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Fluxo} from '../fluxo';
import {FluxoService} from '../fluxo.service';
import {FluxoNovoComponent} from '../fluxo-novo/fluxo-novo.component';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-fluxo-lista',
    templateUrl: './fluxo-lista.component.html'
})
export class FluxoListaComponent implements OnInit {
    @Input() casouso_id: number;
     @ViewChild(FluxoNovoComponent)
    private novoComponent: FluxoNovoComponent;
    fluxos: Fluxo[];
    fluxo: Fluxo;

    constructor(private fluxoService: FluxoService) { }

    ngOnInit() {
        this.getFluxos();
    }

    getFluxos(): void {
        this.fluxoService.todos_do_casouso(this.casouso_id)
            .subscribe(fluxos => this.fluxos = fluxos);
    }


    delete(fluxo: Fluxo): void {
        this.fluxoService.deleta(fluxo)
            .subscribe(_ => this.getFluxos());
    }

    editar(obj: Fluxo) {
        this.fluxo = obj;
        this.novoComponent.open();
    }

    novo() {
        this.fluxo = {casouso_id: this.casouso_id};
        this.novoComponent.open();
    }
    
    abrir(){
        
    }
}
