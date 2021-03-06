import {Component, OnInit, Input, ViewChild, ViewContainerRef,
    Output, EventEmitter, OnDestroy, Injectable} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JanelaDirective} from './janela.directive';
import {EuFormulario} from '../../Interfaces/MinhasInterfaces';

@Component({
  selector: 'ngbd-modal-content',
  template: `
     <div class="modal-header">
      <h4 class="modal-title">{{janelaTitulo}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('cancelar')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ng-template j-d></ng-template>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('gravar');">Gravar</button>
    </div>
  `
})
export class NgbdModalContent {
    @Input() @ViewChild(JanelaDirective) jD: JanelaDirective;
    @Input() janelaTitulo: string = 'Novo';
    @Output() resultado = new EventEmitter<string>();
    constructor(public activeModal: NgbActiveModal) { }
}

@Injectable()
export class JanelaService {
    
   janelaTitulo: string = 'Novo';
   @Output() saiuResultado = new EventEmitter<any>();
    //janelaTitulo
   janelaFuncao: string = 'Novo';
    textoBotao: string = 'Novo';
    childContent: any; // formulario a ser instanciado
    objeto: any; // parametro a ser passado para formulario
   constructor(private modalService: NgbModal) {}

    open(componentFactory: any) {
        const modalRef = this.modalService.open(NgbdModalContent);
        let janelaRef = (<NgbdModalContent>modalRef.componentInstance);
        janelaRef.janelaTitulo = this.janelaTitulo;
        let viewContainerRef: ViewContainerRef = janelaRef.jD.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        this.childContent = (<any>componentRef.instance);
        (<EuFormulario> this.childContent).objeto = this.objeto;
        modalRef.result.then((result) => {
            this.trataResultado(result);
            this.childContent = null;
            this.objeto = null;
          }, (reason) => {
            this.saiuResultado.emit('cancelou');
          });
    }
    
    trataResultado(r: string){
        switch(r){
            case 'gravar': this.gravar(); break;
            case 'cancelar': this.saiuResultado.emit('cancelou');  break;
        }
    }
    
    
    gravar(){
       let formulario = (<EuFormulario>this.childContent);
       formulario.aoGravar.subscribe((obj: any) => {
           this.objeto = obj;
           this.saiuResultado.emit('gravou');
       });
       formulario.gravar();
    }

}
