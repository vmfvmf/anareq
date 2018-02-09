import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {IAlertMsg} from '../iAlertMsg';


@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
    message: string = '';

    public alerts: Array<IAlertMsg> = [];
    //private backup: Array<IAlertMsg>;

    constructor(public messageService: MessageService) {
        messageService.getIAlertMsg().subscribe(m => this.pushMensagem(m));
    }

    pushMensagem(m: IAlertMsg) {
        if (m && m.tipo) {
            this.alerts = [];
            this.alerts.push(m);
//            setInterval(() => {
//                let index = this.alerts.indexOf(m);
//                this.alerts.splice(index,1);
//            }, 5000);
        }
    }

    ngOnInit() {
    }

    public closeAlert(alert: IAlertMsg) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

//    public reset() {
//        this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
//    }

}

