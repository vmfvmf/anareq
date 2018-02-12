import {Component, OnInit, Input, ViewChild, ViewContainerRef,
    Output, EventEmitter, OnDestroy} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JanelaDirective} from './janela.directive';
import {EuFormulario} from '../../Interfaces/MinhasInterfaces';

@Component({
  selector: 'ngbd-modal-content',
  template: `
     <div class="modal-header">
      <h4 class="modal-title">{{janelaTitulo}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ng-template j-d></ng-template>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="fecharComSucesso()">Gravar</button>
    </div>
  `
})
export class NgbdModalContent implements OnDestroy{
    @Input() @ViewChild(JanelaDirective) jD: JanelaDirective;
    @Input() janelaTitulo: string = 'Novo';
    @Output() resultado = new EventEmitter<any>();
    constructor(public activeModal: NgbActiveModal) { }
    
    fecharComSucesso(){
        this.resultado.emit('gravar');
        this.activeModal.close('gravar');
    }
    
    ngOnDestroy(){
        this.resultado.emit('fechar');
    }
}

@Component({
    selector: 'app-janela',
    templateUrl: './janela.component.html'
})
export class JanelaComponent implements OnInit {
    
   @Input() janelaTitulo: string = 'Novo';
   @Output() saiuResultado = new EventEmitter<any>();
    //janelaTitulo
    @Input() janelaFuncao: string = 'Novo';
    @Input() textoBotao: string = 'Novo';
    childContent: any; // formulario a ser instanciado
    objeto: any; // parametro a ser passado para formulario
    constructor(private modalService: NgbModal) {}
 
    ngOnInit() {
    }

    open(componentFactory: any) {
        const modalRef = this.modalService.open(NgbdModalContent);
        let janelaRef = (<NgbdModalContent>modalRef.componentInstance);
        janelaRef.janelaTitulo = this.janelaTitulo;
        let viewContainerRef: ViewContainerRef = janelaRef.jD.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        this.childContent = (<any>componentRef.instance);
        (<EuFormulario> this.childContent).objeto = this.objeto;
        janelaRef.resultado.subscribe( (r: string) => this.trataResultado(r));
    }
    
    trataResultado(r: string){
        switch(r){
            case 'gravar': this.gravar(); break;
            case 'fechar': this.fecharJanela(); break;
        }
    }
    
    fecharJanela(){
        this.childContent = null;
        this.objeto = null;
        this.saiuResultado.emit('cancelou');
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
