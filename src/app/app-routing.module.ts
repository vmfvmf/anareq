import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent }   from './login-session/login/login.component';
import { ProjetoNovoComponent }  from './projeto/projeto-novo/projeto-novo.component';
import { ProjetoListaComponent }  from './projeto/projeto-lista/projeto-lista.component';
import { ProjetoDetalhesComponent }  from './projeto/projeto-detalhes/projeto-detalhes.component';
import { SprintDetalhesComponent }  from './sprint/sprint-detalhes/sprint-detalhes.component';
import { CasousoDetalhesComponent }  from './casouso/casouso-detalhes/casouso-detalhes.component';
import { FluxoDetalhesComponent }  from './fluxo/fluxo-detalhes/fluxo-detalhes.component';
import { RnDetalhesComponent }  from './rn/rn-detalhes/rn-detalhes.component';
//import { FluxopassoDetalhesComponent }  from './fluxo/passo-detalhes/fluxo-detalhes.component';

const routes: Routes = [
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginComponent },
//{ path: 'fluxopasso/:id', component: ProjetoDetalhesComponent },
{ path: 'projeto/:id', component: ProjetoDetalhesComponent },
{ path: 'projetos', component: ProjetoListaComponent },
{ path: 'sprint/:id', component: SprintDetalhesComponent },
{ path: 'fluxo/:id', component: FluxoDetalhesComponent },
{ path: 'casouso/:id', component: CasousoDetalhesComponent },
{ path: 'rn/:id', component: RnDetalhesComponent },
{ path: 'projeto-novo', component: ProjetoNovoComponent },
{ path: 'projeto-lista', component: ProjetoListaComponent }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}