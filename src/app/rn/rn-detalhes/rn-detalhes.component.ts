import { Component, OnInit, ViewChild } from '@angular/core';
import {Rn} from '../rn';
import {BreadcrumbComponent} from '../../componentes/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-rn-detalhes',
  templateUrl: './rn-detalhes.component.html'
})
export class RnDetalhesComponent implements OnInit {
    @ViewChild(BreadcrumbComponent) breadcrumb: BreadcrumbComponent;
    rn: Rn;
    
  constructor() { }

  ngOnInit() {
  }
  
  carregouRn(param: any){
      if (param == "rn"){
          this.rn = this.breadcrumb.rn;
      }
  }

}
