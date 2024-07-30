import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private subject: Subject<MessageEvent>;

  constructor() {
    this.subject = this.createWebSocket();
  }

  private createWebSocket(): Subject<MessageEvent> {
    const ws = new WebSocket('ws://localhost:8080'); 
    const observable = new Observable<MessageEvent>(obs => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }

  get messages(): Observable<MessageEvent> {
    return this.subject.asObservable();
  }
}
