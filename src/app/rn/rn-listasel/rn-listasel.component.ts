import {Passo} from '../../fluxo/passo';
import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {Rn} from '../rn';
import {RnService} from '../rn.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-rn-listasel',
    templateUrl: './rn-listasel.component.html'
})
export class RnListaselComponent implements OnInit {
    @ViewChild('content') eleRef: ElementRef;
    public passo: Passo;
    //@Output() aoSelecionar = new EventEmitter<any>();

    constructor(private rnService: RnService, private modalService: NgbModal) {}

    rns: Rn[    ];

//    @Input    () 
//    passo: Passo;
    @Output() aoSelecionar = new EventEmitter<Rn>();

    ngOnInit() {
        this.getRns();
    }


    getRns(): void {
        this.rnService.todos()
            .subscribe(obj => this.rns = obj);
    }
    
    seleciona(obj: Rn):void{
        this.aoSelecionar.emit(obj); 
        this.rnService.add_fluxopasso_rn({id: obj.id, fluxopasso_id: this.passo.id});
    }
    
    open() {
        this.modalService.open(this.eleRef).result.then((result) => {
            switch (result) {
               // case 'gravar': this.aoGravar.emit(); break;
                default: break;
            }
        }, (reason) => {
           // this.aoGravar.emit();
        });
    }

}
