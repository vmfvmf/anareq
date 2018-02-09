import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: []
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    constructor(public messageService: MessageService) {}

    ngOnInit() {
    }

}
