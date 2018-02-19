import { Injectable, ComponentFactoryResolver, Output, EventEmitter, OnInit } from '@angular/core';

import { RnService } from './rn/rn.service';
import { ProjetoService } from './projeto/projeto.service';
import { SprintService } from './sprint/sprint.service';
import { CasousoService } from './casouso/casouso.service';
import { FluxoService } from './fluxo/fluxo.service';
import { FluxopassoService } from './fluxo/fluxopasso.service';
import { EuCRUD } from './Interfaces/MinhasInterfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from './projeto/projeto';
import { Sprint } from './sprint/sprint';
import { Casouso } from './casouso/casouso';
import { Fluxo } from './fluxo/fluxo';
import { Fluxopasso } from './fluxo/fluxopasso';
import { Rn } from './rn/rn';
import { JanelaService } from './componentes/janela/janela.service';
import { ProjetoNovoComponent } from './projeto/projeto-novo/projeto-novo.component';
import { SprintNovoComponent } from './sprint/sprint-novo/sprint-novo.component';
import { CasousoNovoComponent } from './casouso/casouso-novo/casouso-novo.component';
import { FluxoNovoComponent } from './fluxo/fluxo-novo/fluxo-novo.component';
import { FluxopassoNovoComponent } from './fluxo/fluxopasso-novo/fluxopasso-novo.component';
import { RnNovoComponent } from './rn/rn-novo/rn-novo.component';
import { RnListaselComponent } from './rn/rn-listasel/rn-listasel.component';
import { FluxopassoEsbocoNovoComponent } from './fluxo/fluxopasso-esboco-novo/fluxopasso-esboco-novo.component';

@Injectable()
export class FacadeService implements OnInit{
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


  @Output() carregou = new EventEmitter<any>();
  @Output() atualizouObjeto = new EventEmitter<any>();

  constructor(public rnService: RnService, public projetoService: ProjetoService,
    public sprintService: SprintService, public casousoService: CasousoService,
    public fluxoService: FluxoService, public fluxopassoService: FluxopassoService,
    private route: ActivatedRoute, private router: Router, private janelaService: JanelaService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(){
    this.carregaInfo();
      this.janelaService.saiuResultado.subscribe(
        obj => this.janelaResultado(obj)
    );
    console.log('oninit');
  }


  carregaInfo() {
    // console.log(this.router.url);
    let url: any[] = this.router.url.split('/');
    this.paginaAtual = url[1];
    let id = url[2];
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
    (<EuCRUD>this.servicoAtual).deleta(this.objetoAtual).subscribe(() => {
      this.router.navigate(['/' + this.getPaiDoObjAtual()]);
    });
  }

  novoObjeto() {
    this.janelaService.objeto = this.getObjAtualPrototipo();
    this.abreJanelaEdicao();
  }

  editarObjeto() {
    this.janelaService.objeto = this.objetoAtual;
    this.abreJanelaEdicao();
  }

  /** Use apenas para formularios de criacao/edicao */
  abreJanelaX(x: string, prototipo: any = this.getObjAtualPrototipo(x)) {
    this.janelaService.objeto = prototipo;
    console.log(prototipo);
    this.abreJanelaEdicao(this.getObjAtualForm(x), this.getObjAtualClase(x));
  }

  /** FUNCTION funcao que abre o modal de edicao do objeto atual  
      * objAtualForm opcional: Classe do formulario para edicao  
      * objAtualTitulo opcional: Titulo apresentado no modal */
  abreJanelaEdicao(objAtualForm: any = this.getObjAtualForm(), objAtualTitulo: string = this.getObjAtualClase()) {
    this.janelaService.janelaTitulo = objAtualTitulo;
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(objAtualForm);
    this.janelaService.open(componentFactory);
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
      case 'sprint': return { projeto_id: this.projeto.id };
      case 'casouso': return { sprint_id: this.sprint.id };
      case 'fluxo': return { casouso_id: this.casouso.id };
      case 'fluxopasso': return { fluxo_id: this.fluxo.id };
      case 'rn': return { casouso_id: this.casouso.id, fluxopasso_id: this.fluxopasso.id }; // PREVER OUTRA POSSIBILIDADE: RN PROJETO
      case 'fluxopasso-esboco': return { fluxopasso_id: this.fluxopasso.id };
      default: return {};
    }
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
      case 'fluxopasso-esboco': return FluxopassoEsbocoNovoComponent;
    }
    return null;
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
      case 'fluxopasso-esboco': return 'Esboço de Tela';
    }
    return 'NAO IMPLEMENTADO';
  }

}
