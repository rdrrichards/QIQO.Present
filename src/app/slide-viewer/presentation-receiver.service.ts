import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PresentationReceiverService {

  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded', navigator);
      if (navigator.presentation.receiver) {
        navigator.presentation.receiver.connectionList.then(list => {
          list.connections.map(connection => this.addConnection(connection));
          list.addEventListener('connectionavailable', (event) => {
            this.addConnection(event.connection);
          });
        });
      }
    });
  }
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

    document.addEventListener('onloaded', () => {
      console.log('onloaded', navigator.presentation.receiver);
      if (navigator.presentation.receiver) {
        navigator.presentation.receiver.connectionList.then(list => {
          list.connections.map(connection => this.addConnection(connection));
          list.addEventListener('connectionavailable', (event) => {
            this.addConnection(event.connection);
          });
        });
      }
    });
  }

  addConnection(connection) {
    console.log('addConnection connection.connectionId', connection.id);
    // connection.connectionId = ++connectionIdx;
    // addMessage('New connection #' + connectionIdx);

    connection.addEventListener('message', (event) => {
      console.log('message receiver event', event);
      const data = JSON.parse(event.data);
      // const logString = 'Message ' + messageIdx + ' from connection #' +
      //     connection.connectionId + ': ' + data.message;
      if (data.thing.url) {
        // window.location = data.thing.url;
        console.log('we need to show this: ', data.thing.url);
      }
      connection.send('Received message ' + data.thing.url);
    });

    // connection.addEventListener('close', function(event) {
    //   addMessage('Connection #' + connection.connectionId + ' closed, reason = ' +
    //       event.reason + ', message = ' + event.message);
    // });
  };
}
