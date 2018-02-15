import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {CasousoService} from '../casouso.service';
import {Casouso} from '../casouso';
import {EuFormulario} from '../../Interfaces/MinhasInterfaces';

@Component({
    selector: 'app-casouso-novo',
    templateUrl: './casouso-novo.component.html'
})
export class CasousoNovoComponent implements OnInit, EuFormulario {
    private _c: Casouso;
    @Input() 
    set objeto(c: Casouso) { this.janela = (c.id > 0)  ? 'Editar' : 'Novo'; this._c = c;  }
    get objeto(){ return this._c;  }
    
   private janela: string = 'Novo';
    
    @Output() aoGravar = new EventEmitter<any>();

    constructor(private casousoService: CasousoService) {}

    ngOnInit() { }
    
    gravar(): void {
        if (this.objeto.id > 0) {
            this.casousoService.gravar(this.objeto)
            .subscribe( obj => this.aoGravar.emit( obj ));
        }
        else this.casousoService.novo(this.objeto)
            .subscribe((obj: Casouso) => this.aoGravar.emit(obj));
    }


}
