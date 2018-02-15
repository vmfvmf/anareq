import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-botao-excluir',
  templateUrl: './botao-excluir.component.html'
})
export class BotaoExcluirComponent implements OnInit {
    @Output() aoExcluir = new EventEmitter<any>();
    public IsCollapsed: boolean = true;
    private _classeObj = 'objeto';
    @Input() 
    set classeObj(obj: string) {this._classeObj = obj;}
    get classeObj() {return this._classeObj;}
  constructor() { }

  ngOnInit() {
  }
  
  excluir(){
      this.aoExcluir.emit();
  }

}
