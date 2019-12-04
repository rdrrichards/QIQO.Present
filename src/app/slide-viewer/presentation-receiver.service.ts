import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentationReceiverService {
  private urlSubject: Subject<string> = new Subject<string>();
  url$ = this.urlSubject.asObservable();

  constructor() { }
  receiverReady() {
    console.log('receiverReady', navigator.presentation.receiver);

    if (navigator.presentation.receiver) {
      navigator.presentation.receiver.connectionList.then(list => {
        list.connections.map(connection => this.addConnection(connection));
        list.addEventListener('connectionavailable', (event) => {
          console.log('connectionavailable', event.receiver);
          this.addConnection(event.connection);
        });
      });
    }
  }

  addConnection(connection) {
    console.log('addConnection connection.connectionId', connection.id);
    console.log('addConnection navigator.presentation', navigator.presentation);
    connection.addEventListener('message', (event) => {
      console.log('message receiver event', event);
      const data = JSON.parse(event.data);
      // const logString = 'Message ' + messageIdx + ' from connection #' +
      //     connection.connectionId + ': ' + data.message;
      if (data.thing.url) {
        // window.location = data.thing.url;
        console.log('we need to show this: ', data.thing.url);
        this.urlSubject.next(data.thing.url);
      }
      // connection.send('Sending message ' + data.thing.url);
    });
  }
}
