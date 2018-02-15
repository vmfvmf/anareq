import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ProjetoService} from '../projeto.service';
import {Projeto} from '../projeto';
import {EuFormulario} from '../../Interfaces/MinhasInterfaces';

@Component({
    selector: 'app-projeto-novo',
    templateUrl: './projeto-novo.component.html'
})
export class ProjetoNovoComponent implements OnInit, EuFormulario {
    private _projeto: Projeto;
    @Input()
    set objeto(obj: Projeto) { this.janela = (obj && obj.id > 0) ? 'Editar' : 'Novo';  this._projeto = obj;  }
    get objeto() {  return this._projeto;  }

    private janela: string = 'Novo';

    @Output() aoGravar = new EventEmitter<any>();

    constructor(private projetoService: ProjetoService) {}

    ngOnInit() { }

    gravar(): void {
        if (this.objeto.id > 0) {
            this.projetoService.gravar(this.objeto)
            .subscribe( obj => this.aoGravar.emit( obj ));
        }
        else this.projetoService.novo(this.objeto)
            .subscribe((obj: Projeto) => {
                this.aoGravar.emit(obj);
        });
    }

}
