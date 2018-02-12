import {Component, OnInit, Output, EventEmitter, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Projeto} from '../../projeto/projeto';
import {ProjetoService} from '../../projeto/projeto.service';
import {ProjetoNovoComponent} from '../../projeto/projeto-novo/projeto-novo.component';
import {Sprint} from '../../sprint/sprint';
import {SprintService} from '../../sprint/sprint.service';
import {SprintNovoComponent} from '../../sprint/sprint-novo/sprint-novo.component';
import {Casouso} from '../../casouso/casouso';
import {CasousoService} from '../../casouso/casouso.service';
import {CasousoNovoComponent} from '../../casouso/casouso-novo/casouso-novo.component';
import {Fluxo} from '../../fluxo/fluxo';
import {FluxoService} from "../../fluxo/fluxo.service";
import {FluxoNovoComponent} from "../../fluxo/fluxo-novo/fluxo-novo.component";
import {Passo} from '../../fluxo/passo';
import {PassoNovoComponent} from '../../fluxo/passo-novo/passo-novo.component';
import {Rn} from '../../rn/rn';
import {RnService} from '../../rn/rn.service';
import {RnNovoComponent} from '../../rn/rn-novo/rn-novo.component';
import {EuCRUD} from '../../Interfaces/MinhasInterfaces';
import {JanelaComponent} from '../../componentes/janela/janela.component';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
    projeto: Projeto;
    sprint: Sprint;
    casouso: Casouso;
    fluxo: Fluxo;
    passofluxo: Passo;
    rn: Rn;

    paginaAtual: string;
    servicoAtual: any;
    objetoAtual: any;
    objetoAtualPrototipo: any;
    objetoAtualClasse: string;
    
    @ViewChild(JanelaComponent) janela: JanelaComponent;
    
    @Output() carregou = new EventEmitter<any>();
    @Output() atualizouObjeto = new EventEmitter<any>();

    constructor(private route: ActivatedRoute, private router: Router, public projetoService: ProjetoService,
        public sprintService: SprintService, public casousoService: CasousoService, private fluxoService: FluxoService,
        public rnService: RnService, private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit() {
        this.carregaInfo();
    }

    carregaInfo() {
        this.paginaAtual = this.router.url.split('/')[1];
        const id = +this.route.snapshot.paramMap.get('id');
        switch (this.paginaAtual) {
            case 'projeto':
                this.getProjeto(id);
                this.objetoAtualClasse = 'Projeto';
                this.servicoAtual = this.projetoService;
                break;
            case 'sprint':
                this.getSprint(id);
                break;
            case 'casouso':
                this.getCasouso(id);
                break;
            case 'fluxo':
                this.getFluxo(id);
                break;
            case 'passofluxo':
            case 'rn': // rn pode estar em diversos passos
                this.getRn(id);
                break;
        };
        ///alert(tes);
    }

    getProjeto(id: number): void {
        this.projetoService.detalhes(id)
            .subscribe(obj =>{
                this.projeto = obj;
                this.carregou.emit('projeto');
                if (this.paginaAtual == 'projeto'){
                     this.objetoAtual = obj;
                     this.atualizouObjeto.emit(obj);
                }
        });
    }

    getSprint(id: number): void {
        this.sprintService.detalhes(id)
        .subscribe(obj => {
            this.sprint = obj;
            this.getProjeto(obj.projeto_id);
            this.carregou.emit('sprint');
            if (this.paginaAtual == 'sprint') this.objetoAtual = obj;
        });
    }
    
     getCasouso(id: number): void {
        this.casousoService.detalhes(id)
        .subscribe(obj => {
            this.casouso = obj;
            this.getSprint(obj.sprint_id);
            this.carregou.emit('casouso');
            if (this.paginaAtual == 'casouso') this.objetoAtual = obj;
        });
    }
    
    getFluxo(id: number): void {
        this.fluxoService.detalhes(id)
        .subscribe(obj => {
             this.fluxo = obj;
             this.getCasouso(obj.casouso_id)
             this.carregou.emit('fluxo');
             if (this.paginaAtual == 'fluxo') this.objetoAtual = obj;
        });
    }
    
    getRn(id: number): void{
        this.rnService.detalhes(id)
        .subscribe(obj => {
             this.rn = obj;
             this.getCasouso(obj.casouso_id)
             this.carregou.emit("rn");
              if (this.paginaAtual == 'rn') this.objetoAtual = obj;
        });
    }
    
    deletaObjAtual(){
        (<EuCRUD> this.servicoAtual).deleta(this.objetoAtual).subscribe( () => {
            this.router.navigate(['/dashboard']);
        });
    }
    
    novoObjeto() {
        this.janela.objeto = this.getObjAtualPrototipo();
        this.abreJanelaEdicao();
    }
    
    editarObjeto() {
        this.janela.objeto = this.objetoAtual;
        this.abreJanelaEdicao();
    }
    
    abreJanelaEdicao(){
        this.janela.janelaTitulo = this.objetoAtualClasse;
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getObjAtualForm());
        this.janela.open(componentFactory);
    }
    
    janelaResultado(resultado: string){
        switch(resultado){
            case 'gravou': 
                this.atualizouObjeto.emit(this.janela.objeto); 
            break;
            case 'cancelou': 
                this.carregaInfo();
            break;
        }
        
    }
    
    getObjAtualPrototipo(): any{
        switch (this.paginaAtual){
            case 'projeto': return [];
            case 'sprint': return {projeto_id: this.projeto.id };
            case 'casouso': return {sprint_id: this.sprint.id };
            case 'fluxo': return {casouso_id: this.casouso.id };
            case 'passofluxo': return {fluxo_id: this.fluxo.id };
            case 'rn': return {casouso_id: this.casouso.id };
        }
        return [];
    }
    
    getObjAtualForm(): any{
        switch (this.paginaAtual){
            case 'projeto': return ProjetoNovoComponent;
            case 'sprint': return  SprintNovoComponent;
            case 'casouso': return CasousoNovoComponent;
            case 'fluxo': return FluxoNovoComponent;
            case 'passofluxo': return PassoNovoComponent;
            case 'rn': return RnNovoComponent;
        }
        return [];
    }

}
