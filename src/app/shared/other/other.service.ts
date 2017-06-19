import { Injectable } from '@angular/core';
import { w3cwebsocket } from 'websocket';
import 'rxjs/Rx';
import {WebsocketService} from '../websocket/websocket.service';
import 'rxjs/add/operator/map';
@Injectable()
export class OtherService {
public subject$;
  constructor(private _ws: WebsocketService) {
    this.subject$ = this._ws.create();
    this.subject$.subscribe(
      (data) => console.log('Data recieved = ' + JSON.stringify(data)),
      (err) => console.log('Error ' + err),
      () => console.log('Completed')
    );

    const ping = this.subject$.find((data: (any)) => (data.msg === 'ping'));
    const pong = this.subject$.find((data: (any)) => (data.msg === 'pong'));
    const changed = this.subject$.find((data: (any)) => data.msg === 'changed');
    const token = this.subject$.find((data: (any)) => data.msg === 'result');
    this.subject$.next(JSON.stringify({'msg': 'connect', 'version': '1', 'support': ['1', 'pre2', 'pre1']}));


    ping.subscribe(() => this.subject$.next('pong'));
    pong.subscribe(() => this.subject$.next('ping'));
  }
  customEmoji() {
    this.subject$.next(JSON.stringify({
      'msg': 'method',
      'method': 'listEmojiCustom',
      'id': '62',
      'params': []
    }));
  }

}