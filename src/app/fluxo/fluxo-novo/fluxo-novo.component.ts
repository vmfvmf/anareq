import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FluxoService} from '../fluxo.service';
import {Fluxo} from '../fluxo';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'app-fluxo-novo',
    templateUrl: './fluxo-novo.component.html'
})
export class FluxoNovoComponent implements OnInit {
    private _c: Fluxo;
    
    
    @Input()
    set fluxo(c: Fluxo) {
        this.janela = (c.id > 0) ? 'Editar' : 'Novo';
        this._c = c;

    }
    get fluxo() {
        return this._c;
    }

    private janela: string = 'Novo';

    @Output() abrir = new EventEmitter<any>();
    @Output() aposGravar = new EventEmitter<any>();

    constructor(private fluxoService: FluxoService, private modalService: NgbModal) {}

    ngOnInit() {
    }

    gravar(): void {
        if (this.fluxo.id > 0) {
            this.fluxoService.gravar(this.fluxo)
                .subscribe();
        }
        else this.fluxoService.novo(this.fluxo)
            .subscribe();
    }
    
    public open() {
        alert('tets');
//        this.modalService.open(content).result.then((result) => {
//            switch (result) {
//                case 'gravar': this.aposGravar.emit(); break;
//                default: break;
//            }
//        }, (reason) => {
//            this.aposGravar.emit(); 
//        });
    }
}
