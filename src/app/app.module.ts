import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http'; // <-- NgModel lives here
import {AppComponent} from './app.component';
import {MessagesComponent} from './messages/messages.component';
import {MessageService} from './message.service';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login-session/login/login.component';
import {LoginService} from './login-session/login.service';
import {ProjetoNovoComponent} from './projeto/projeto-novo/projeto-novo.component';
import {ProjetoService} from './projeto/projeto.service';
import {ProjetoListaComponent} from './projeto/projeto-lista/projeto-lista.component';
import {ProjetoDetalhesComponent} from './projeto/projeto-detalhes/projeto-detalhes.component';
import {SprintNovoComponent} from './sprint/sprint-novo/sprint-novo.component';
import {SprintService} from './sprint/sprint.service';
import {SprintListaComponent} from './sprint/sprint-lista/sprint-lista.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SprintDetalhesComponent} from './sprint/sprint-detalhes/sprint-detalhes.component';
import {CasousoNovoComponent} from './casouso/casouso-novo/casouso-novo.component';
import {CasousoService} from './casouso/casouso.service';
import {CasousoListaComponent} from './casouso/casouso-lista/casouso-lista.component';
import {CasousoDetalhesComponent} from './casouso/casouso-detalhes/casouso-detalhes.component';
import {FluxoNovoComponent} from './fluxo/fluxo-novo/fluxo-novo.component';
import {FluxoService} from './fluxo/fluxo.service';
import {PassoService} from './fluxo/passo.service';
import { FluxoListaComponent } from './fluxo/fluxo-lista/fluxo-lista.component';
import { FluxoDetalhesComponent } from './fluxo/fluxo-detalhes/fluxo-detalhes.component';
import { PassoNovoComponent } from './fluxo/passo-novo/passo-novo.component';
import { PassoListaComponent } from './fluxo/passo-lista/passo-lista.component';
import { SessionComponent } from './login-session/session/session.component';
import {RnNovoComponent} from './rn/rn-novo/rn-novo.component';
import {RnService} from './rn/rn.service';
import {RnListaComponent} from './rn/rn-lista/rn-lista.component';
import { BotaoExcluirComponent } from './componentes/botao-excluir/botao-excluir.component';
import {RnModule} from './rn/rn.module';


@NgModule({
    declarations: [
        AppComponent,
        MessagesComponent,
        DashboardComponent,
        LoginComponent,
        ProjetoNovoComponent,
        ProjetoListaComponent,
        ProjetoDetalhesComponent,
        SprintNovoComponent,
        SprintListaComponent,
        NavbarComponent,
        SprintDetalhesComponent,
        CasousoNovoComponent,
        CasousoListaComponent,
        CasousoDetalhesComponent,
        FluxoNovoComponent,
        FluxoListaComponent,
        FluxoDetalhesComponent,
        PassoNovoComponent,
        PassoListaComponent,
        SessionComponent,
        BotaoExcluirComponent,
        RnNovoComponent,
        RnListaComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        RnModule
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        //HttpClientInMemoryWebApiModule.forRoot(
        //  InMemoryDataService, { dataEncapsulation: false }
        //)
    ],
    providers: [MessageService, LoginService, ProjetoService, SprintService, CasousoService,
        FluxoService, PassoService, RnService],
    bootstrap: [AppComponent]
})
export class AppModule {


}
