import {Fluxopasso} from '../../fluxo/fluxopasso';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Rn} from '../rn';
import {RnService} from '../rn.service';
import {EuFormulario} from '../../Interfaces/MinhasInterfaces';

@Component({
    selector: 'app-rn-listasel',
    templateUrl: './rn-listasel.component.html'
})
export class RnListaselComponent implements OnInit, EuFormulario {
    private _fluxopasso: Fluxopasso;
    @Input()
    set objeto(obj: Fluxopasso) {this._fluxopasso = obj; this.getRns();}
    get objeto() {return this._fluxopasso;}

    constructor(private rnService: RnService) {}
    rns: Rn[];
    selrns: Rn[] = new Array();

    @Output() aoGravar = new EventEmitter<any>();

    ngOnInit() {}


    getRns(): void {
        if (this.objeto.id) this.rnService.desvinculados_do_passo(this.objeto.id)
            .subscribe(obj => this.rns = obj);
    }

    seleciona(obj: Rn): void {
        this.selrns.push(obj);
        this.selrns.sort((o1, o2) => o1.numero - o2.numero);
        this.rns.splice(this.rns.indexOf(obj), 1);
    }
    remove(obj: Rn): void {
        this.rns.push(obj);
        this.rns.sort((o1, o2) => o1.numero - o2.numero);
        this.selrns.splice(this.selrns.indexOf(obj), 1);
    }

    gravar(): void {
        this.gravarRecursivo(0);
        this.aoGravar.emit('gravar');
    }
    gravarRecursivo(i: number) {
        this.rnService.add_fluxopasso_rn({id: this.selrns[i].id, fluxopasso_id: this.objeto.id})
            .subscribe( obj => {
                console.log(obj);
                if (i < this.selrns.length) {
                    this.gravarRecursivo(i+1);
                }
            });

    }

}
