import { Injectable } from '@angular/core';

const key = 'presentationId';

@Injectable({
  providedIn: 'root'
})
export class PresentationControllerService {
  presentationConnection: any;
  constructor() { }

  startPresentationRequest(url: string) {
    if (!navigator.presentation.defaultRequest) {
      this.createPresentationRequest(url);
      console.log('Starting presentation request...');
      this.present();
    } else if (!this.presentationConnection) {
      this.reconnect();
    }
  }
  createPresentationRequest(url: string) {
    // Make this presentation the default one when using the "Cast" browser menu.
    navigator.presentation.defaultRequest = new PresentationRequest([url]); // this.presentationRequest;
    // navigator.presentation.defaultRequest.onconnectionavailable = event => {
    //   console.log('onconnectionavailable event', event);
    //   this.setConnection(event.connection);
    // };
  }
  present() {
    navigator.presentation.defaultRequest.start()
    .then(connection => {
      this.setConnection(connection);
      // console.log('> Connected to ' + connection.url + ', id: ' + connection.id);
    })
    .catch(error => {
      console.log('> ' + error.name + ': ' + error.message);
    });
  }
  sendMessage(thing: any) {
    const lang = document.body.lang || 'en-US';
    console.log('Sending', JSON.stringify(thing));
    this.presentationConnection.send(JSON.stringify({ thing, lang }));
  }
  reconnect() {
    const presentationId = localStorage.getItem(key);
    if (presentationId) {
      navigator.presentation.defaultRequest.reconnect(presentationId)
        .then(connection => {
          console.log('Reconnected to ' + connection.id);
          this.setConnection(connection);
        })
        .catch(error => {
          console.log('Presentation.reconnect() error, ' + error.name + ': ' + error.message);
        });
    } else {
      this.present();
    }
  }
  setConnection(newConnection) {
    // Disconnect from existing presentation, if not attempting to reconnect
    if (this.presentationConnection && this.presentationConnection !== newConnection && this.presentationConnection.state !== 'closed') {
      this.presentationConnection.onclosed = undefined;
      this.presentationConnection.close();
    }

    // Set the new connection and save the presentation ID
    this.presentationConnection = newConnection;
    // localStorage["presId"] = this.connection.id;
    localStorage.setItem(key, this.presentationConnection.id);

    // Monitor the connection state
    this.presentationConnection.onconnect = _ => {
        // Register message handler
        this.presentationConnection.onmessage = message => {
            console.log(`Received message: ${message.data}`);
        };

        // Send initial message to presentation page
        this.presentationConnection.send('Say hello');
    };

    this.presentationConnection.onclose = _ => {
      this.presentationConnection = null;
      console.log('Connection closed');
    };

    this.presentationConnection.onterminate = _ => {
        // Remove from localStorage if exists
        localStorage.removeItem(key);
        this.presentationConnection = null;
        console.log('Connection Terminated');
    };
  }
  closePresentationRequest() {
    console.log('Closing connection...');
    this.presentationConnection.close();
  }

  terminatePresentationRequest() {
    console.log('Terminating connection...');
    this.presentationConnection.terminate();
  }
}
