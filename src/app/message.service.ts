import {Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IAlertMsg} from './iAlertMsg';

@Injectable()
export class MessageService {
//    messages: string[] = [];
    iAlertMsgs: IAlertMsg[] = [];

//    message? = new BehaviorSubject<string>('');
    iAlertMsg? = new BehaviorSubject<IAlertMsg>({msg: ''});

//    add(message: string) {
//        this.messages.push(message);
//        this.message.next(message);
//    }
    
    addIAlertMsg(msg: IAlertMsg) {
        this.iAlertMsgs.push(msg);
        this.iAlertMsg.next(msg);
    }
    
    getIAlertMsg(): Observable<IAlertMsg> {
        return this.iAlertMsg.asObservable();
    }
    
//    getMessage(): Observable<string> {
//        return this.message.asObservable();
//    }

//    clear() {
//        this.messages = [];
//    }
}