import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ProjetoService} from '../projeto.service';

@Component({
    selector: 'app-projeto-novo',
    templateUrl: './projeto-novo.component.html',
    styleUrls: ['./projeto-novo.component.css']
})
export class ProjetoNovoComponent implements OnInit {

    constructor(
        private projetoService: ProjetoService,
        private location: Location) {}


    ngOnInit() {
    }

    novo(nome: string, descricao: string): void {
        this.projetoService.novo(nome, descricao)
            .subscribe(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}
