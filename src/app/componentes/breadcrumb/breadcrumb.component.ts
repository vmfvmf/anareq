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
import {Fluxopasso} from '../../fluxo/fluxopasso';
import {FluxopassoNovoComponent} from '../../fluxo/fluxopasso-novo/fluxopasso-novo.component';
import {FluxopassoService} from '../../fluxo/fluxopasso.service';
import {Rn} from '../../rn/rn';
import {RnService} from '../../rn/rn.service';
import {RnNovoComponent} from '../../rn/rn-novo/rn-novo.component';
import {RnListaselComponent} from '../../rn/rn-listasel/rn-listasel.component';
import {EuCRUD} from '../../Interfaces/MinhasInterfaces';
import {JanelaComponent} from '../../componentes/janela/janela.component';
import { FluxopassoEsbocoNovoComponent } from '../../fluxo/fluxopasso-esboco-novo/fluxopasso-esboco-novo.component'
@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
    projeto: Projeto;
    sprint: Sprint;
    casouso: Casouso;
    fluxo: Fluxo;
    fluxopasso: Fluxopasso;
    rn: Rn;

    paginaAtual: string;
    servicoAtual: any;
    objetoAtual: any = null;
    objetoAtualPrototipo: any;
    objetoAtualClasse: string;

    @ViewChild(JanelaComponent) janela: JanelaComponent;

    @Output() carregou = new EventEmitter<any>();
    @Output() atualizouObjeto = new EventEmitter<any>();

    constructor(private route: ActivatedRoute, private router: Router, public projetoService: ProjetoService,
        public sprintService: SprintService, public casousoService: CasousoService, private fluxoService: FluxoService,
        public rnService: RnService, public fluxopassoService: FluxopassoService, private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit() {
        this.carregaInfo();
    }

    carregaInfo() {
        this.paginaAtual = this.router.url.split('/')[1];
        const id = +this.route.snapshot.paramMap.get('id');
        switch (this.paginaAtual) {
            case 'projeto':
                this.getProjeto(id);
                this.servicoAtual = this.projetoService;
                break;
            case 'sprint':
                this.getSprint(id);
                this.servicoAtual = this.sprintService;
                break;
            case 'casouso':
                this.getCasouso(id);
                this.servicoAtual = this.casousoService;
                break;
            case 'fluxo':
                this.getFluxo(id);
                this.servicoAtual = this.fluxoService;
                break;
            case 'fluxopasso':
                this.getFluxopasso(id);
                this.servicoAtual = this.fluxopassoService;
                break;
            case 'rn': // rn pode estar em diversos passos
                this.getRn(id);
                this.servicoAtual = this.rnService;
                break;
        };
    }

    getProjeto(id: number): void {
        this.projetoService.detalhes(id)
            .subscribe(obj => {
                this.projeto = obj;
                this.carregou.emit('projeto');
                if (this.paginaAtual == 'projeto') {
                    this.objetoAtual = obj;
                    this.atualizouObjeto.emit(obj);
                }
            });
    }

    getSprint(id: number): void {
        this.sprintService.detalhes(id)
            .subscribe(obj => {
                this.sprint = obj;
                this.carregou.emit('sprint');
                if (this.paginaAtual == 'sprint') {
                    this.objetoAtual = obj;
                    this.atualizouObjeto.emit(obj);
                }
                this.getProjeto(obj.projeto_id);
            });
    }

    getCasouso(id: number): void {
        this.casousoService.detalhes(id)
            .subscribe(obj => {
                this.casouso = obj;
                this.carregou.emit('casouso');
                if (this.paginaAtual == 'casouso') {
                    this.objetoAtual = obj;
                    this.atualizouObjeto.emit(obj);
                }
                this.getSprint(obj.sprint_id);
            });
    }

    getFluxo(id: number): void {
        this.fluxoService.detalhes(id)
            .subscribe(obj => {
                this.fluxo = obj;
                this.carregou.emit('fluxo');
                if (this.paginaAtual == 'fluxo') {
                    this.objetoAtual = obj;
                    this.atualizouObjeto.emit(obj);
                }
                this.getCasouso(obj.casouso_id);
            });
    }

    getFluxopasso(id: number): void {
        this.fluxopassoService.detalhes(id)
            .subscribe(obj => {
                this.fluxopasso = obj;
                this.carregou.emit('fluxopasso');
                if (this.paginaAtual == 'fluxopasso') {
                    this.objetoAtual = obj;
                    this.atualizouObjeto.emit(obj);
                }
                this.getFluxo(obj.fluxo_id);
            });
    }

    getRn(id: number): void {
        this.rnService.detalhes(id)
            .subscribe(obj => {
                this.rn = obj;
                this.carregou.emit("rn");
                if (this.paginaAtual == 'rn') {
                    this.objetoAtual = obj;
                    this.atualizouObjeto.emit(obj);
                }
                this.getCasouso(obj.casouso_id)
            });
    }

    deletaObjAtual() {
        (<EuCRUD> this.servicoAtual).deleta(this.objetoAtual).subscribe(() => {
            this.router.navigate(['/'+ this.getPaiDoObjAtual()]);
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

    /** Use apenas para formularios de criacao/edicao */
    abreJanelaX(x: string, prototipo: any = this.getObjAtualPrototipo(x)) {
        this.janela.objeto = prototipo;
        this.abreJanelaEdicao(this.getObjAtualForm(x), this.getObjAtualClase(x));
    }
    

    /** FUNCTION funcao que abre o modal de edicao do objeto atual  
        * objAtualForm opcional: Classe do formulario para edicao  
        * objAtualTitulo opcional: Titulo apresentado no modal */
    abreJanelaEdicao(objAtualForm: any = this.getObjAtualForm(), objAtualTitulo: string = this.getObjAtualClase()) {
        this.janela.janelaTitulo = objAtualTitulo;
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(objAtualForm);
        this.janela.open(componentFactory);
    }

    janelaResultado(resultado: string) {
        switch (resultado) {
            case 'gravou':
                this.carregaInfo();
                break;
            case 'cancelou':
                this.carregaInfo();
                break;
        }

    }

    getObjAtualPrototipo(objAtual: string = this.paginaAtual): any {
        switch (objAtual) {
            case 'projeto': return {};
            case 'sprint': return {projeto_id: this.projeto.id};
            case 'casouso': return {sprint_id: this.sprint.id};
            case 'fluxo': return {casouso_id: this.casouso.id};
            case 'fluxopasso': return {fluxo_id: this.fluxo.id};
            case 'rn': return {casouso_id: this.casouso.id, fluxopasso_id: this.fluxopasso.id}; // PREVER OUTRA POSSIBILIDADE: RN PROJETO
        }
        return [];
    }

    getObjAtualForm(objAtualTipo: any = this.paginaAtual): any {
        switch (objAtualTipo) {
            case 'projeto': return ProjetoNovoComponent;
            case 'sprint': return SprintNovoComponent;
            case 'casouso': return CasousoNovoComponent;
            case 'fluxo': return FluxoNovoComponent;
            case 'fluxopasso': return FluxopassoNovoComponent;
            case 'rn': return RnNovoComponent;
            case 'rn-listasel': return RnListaselComponent;
            case 'fluxopasso-esoboco': return FluxopassoEsbocoNovoComponent;
        }
        return [];
    }
    
    getPaiDoObjAtual(objAtualTipo: any = this.paginaAtual): string {
        switch (objAtualTipo) {
            case 'projeto': return 'dashboard';
            case 'sprint': return 'projeto/' + this.sprint.projeto_id;
            case 'casouso': return 'sprint/' + this.casouso.sprint_id;
            case 'fluxo': return 'casouso/' + this.fluxo.casouso_id;
            case 'fluxopasso': return 'fluxo/' + this.fluxo.id;
            case 'rn': return 'casouso/' + this.rn.casouso_id;
        }
        return 'NAO IMPLEMENTADO';
    }

    getObjAtualClase(objAtualTipo: any = this.paginaAtual): string {
        switch (objAtualTipo) {
            case 'projeto': return 'Projeto';
            case 'sprint': return 'Sprint';
            case 'casouso': return 'Caso de Uso';
            case 'fluxo': return 'Fluxo';
            case 'fluxopasso': return 'Passo do Fluxo';
            case 'rn': return 'Regra de Negócio';
            case 'rn-listasel': return 'Vincular Regra de Negócio';
        }
        return 'NAO IMPLEMENTADO';
    }



}
