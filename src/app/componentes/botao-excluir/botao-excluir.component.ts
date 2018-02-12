import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botao-excluir',
  templateUrl: './botao-excluir.component.html'
})
export class BotaoExcluirComponent implements OnInit {
    @Output() aoExcluir = new EventEmitter<any>();
    public IsCollapsed: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  
  excluir(){
      this.aoExcluir.emit();
  }

}
