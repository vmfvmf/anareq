import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {CasousoService} from '../casouso.service';
import {Casouso} from '../casouso';

@Component({
    selector: 'app-casouso-novo',
    templateUrl: './casouso-novo.component.html'
})
export class CasousoNovoComponent implements OnInit {
    private _c: Casouso;
    @Input() 
    set casouso(c: Casouso) {
        this.janela = (c.id > 0)  ? 'Editar' : 'Novo';
        this._c = c;
       
    }
    get casouso(){
        return this._c;
    }
    
   private janela: string = 'Novo';
    
    @Output() aoGravar = new EventEmitter<any>();

    constructor(private casousoService: CasousoService) {}

    ngOnInit() {
    }

    gravar(): void {
        if (this.casouso.id > 0) {
            this.casousoService.gravar(this.casouso)
                .subscribe(_ => this.aoGravar.emit(_));
        }
        else this.casousoService.novo(this.casouso)
            .subscribe((c: Casouso) => this.aoGravar.emit(c));
    }

}
