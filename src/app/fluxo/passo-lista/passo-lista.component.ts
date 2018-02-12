import {Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {Passo} from '../passo';
import {Rn} from '../../rn/rn';
import {RnNovoComponent} from '../../rn/rn-novo/rn-novo.component';
import {RnListaComponent} from '../../rn/rn-lista/rn-lista.component';
import {RnListaselComponent} from '../../rn/rn-listasel/rn-listasel.component';
import {JanelaComponent} from '../../componentes/janela/janela.component';
import {PassoService} from '../passo.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-passo-lista',
    templateUrl: './passo-lista.component.html'
})

export class PassoListaComponent implements OnInit {
    public rn: Rn;
    //@Input() fluxo: Fluxo;
    @ViewChild(RnListaComponent) rnLista: RnListaComponent;
    @ViewChild(RnListaselComponent) rnlistasel: RnListaselComponent;
//    @ViewChild(RnNovoComponent) rnnovo: RnNovoComponent;
    @ViewChild(JanelaComponent) janela: JanelaComponent;
    public passos: Passo[];

    constructor(private passoService: PassoService, private componentFactoryResolver: ComponentFactoryResolver,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.getPassos();
    }

    getPassos(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.passoService.todos_do_fluxo(id)
            .subscribe(ps => this.passos = ps);
    }
    
    janelaResultado(event){
        console.log(event);
    }

    atualizaPassoRns() {
        this.rnLista.getRns();
    }
    addVinculo(obj: Passo) {
        this.rnlistasel.passo = obj;
        this.rnlistasel.open();
    }
    novaRn(obj: Passo) {
        this.janela.objeto = {casouso_id: 20, fluxopasso_id: obj.id};
        this.janela.janelaTitulo = 'Regra de Negócio';
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(RnNovoComponent);
        this.janela.open(componentFactory);
    }

}
