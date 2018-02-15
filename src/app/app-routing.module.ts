import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent }   from './login-session/login/login.component';
import { ProjetoListaComponent }  from './projeto/projeto-lista/projeto-lista.component';
import { ProjetoDetalhesComponent }  from './projeto/projeto-detalhes/projeto-detalhes.component';
import { SprintDetalhesComponent }  from './sprint/sprint-detalhes/sprint-detalhes.component';
import { CasousoDetalhesComponent }  from './casouso/casouso-detalhes/casouso-detalhes.component';
import { FluxoDetalhesComponent }  from './fluxo/fluxo-detalhes/fluxo-detalhes.component';
import { RnDetalhesComponent }  from './rn/rn-detalhes/rn-detalhes.component';
import { FluxopassoDetalhesComponent }  from './fluxo/fluxopasso-detalhes/fluxopasso-detalhes.component';

const routes: Routes = [
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginComponent },
{ path: 'projeto/:id', component: ProjetoDetalhesComponent },
{ path: 'projetos', component: ProjetoListaComponent },
{ path: 'sprint/:id', component: SprintDetalhesComponent },
{ path: 'fluxo/:id', component: FluxoDetalhesComponent },
{ path: 'fluxopasso/:id', component: FluxopassoDetalhesComponent },
{ path: 'casouso/:id', component: CasousoDetalhesComponent },
{ path: 'rn/:id', component: RnDetalhesComponent }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}